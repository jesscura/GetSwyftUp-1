import NextAuth, { type Session, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { z } from "zod";
import { Role } from "@/config/roles";
import { requiresTwoFactor, verifySecondFactor } from "@/lib/twofactor";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  otp: z.string().optional(),
  recoveryCode: z.string().optional(),
});

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" as const },
  pages: { signIn: "/auth/sign-in" },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "One-time code", type: "text" },
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password, otp, recoveryCode } = parsed.data;
        const authEmail = process.env.AUTH_EMAIL;
        const authPassword = process.env.AUTH_PASSWORD;
        const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
        const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

        if (!(authEmail && authPassword) && !(superAdminEmail && superAdminPassword)) {
          console.warn("No authentication credentials configured.");
          return null;
        }

        const matchesEnv = Boolean(authEmail && authPassword && email === authEmail && password === authPassword);
        const matchesSuperAdmin = Boolean(superAdminEmail && superAdminPassword && email === superAdminEmail && password === superAdminPassword);

        if (!matchesEnv && !matchesSuperAdmin) return null;
        const isSuperAdmin = matchesSuperAdmin;
        const role = isSuperAdmin ? Role.SUPER_ADMIN : Role.OWNER;
        const userId = isSuperAdmin ? "user_super_admin" : "user_owner";

        if (requiresTwoFactor(role)) {
          const otpCandidate = otp ?? undefined;
          const recoveryCandidate = recoveryCode ?? (otp && otp.length > 6 ? otp : undefined);
          const verification = verifySecondFactor(userId, otpCandidate, recoveryCandidate);
          if (!verification.ok) {
            throw new Error("MFA_REQUIRED");
          }
        }
        return {
          id: userId,
          name: isSuperAdmin ? "Super Admin" : "Workspace Owner",
          email,
          role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User & { role?: Role } }) {
      if (user && "role" in user) {
        const incomingRole = user.role;
        const isValidRole =
          typeof incomingRole === "string" && Object.values(Role).includes(incomingRole as Role);
        if (isValidRole) {
          token.role = incomingRole;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub;
        const tokenRole = typeof token.role === "string" ? (token.role as Role) : undefined;
        const isValidRole = tokenRole ? Object.values(Role).includes(tokenRole) : false;
        session.user.role = isValidRole ? tokenRole : undefined;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
