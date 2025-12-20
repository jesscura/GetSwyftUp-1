import NextAuth, { type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
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
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const demoEmail = process.env.DEMO_EMAIL || "admin@swyftup.com";
        const demoPassword = process.env.DEMO_PASSWORD || "demo1234!";

        const sharedPassword = password === demoPassword;
        if (email === demoEmail && sharedPassword) {
          return { id: "user_owner", name: "Amelia Chen", email, role: "OWNER" };
        }

        if (email === "contractor@swyftup.com" && sharedPassword) {
          return { id: "user_contractor", name: "Diego Alvarez", email, role: "CONTRACTOR" };
        }

        if (sharedPassword) {
          return { id: `user_${email}`, name: email.split("@")[0], email, role: "FINANCE" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: { role?: string } }) {
      if (user && "role" in user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
