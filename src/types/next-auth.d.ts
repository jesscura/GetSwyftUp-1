import type { DefaultSession } from "next-auth";
import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }
}
