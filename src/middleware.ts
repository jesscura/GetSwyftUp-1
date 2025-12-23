import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Role, canAccessPath, type PermissionScope } from "@/config/roles";

const normalizePath = (pathname: string): PermissionScope["canAccess"][number] => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return "/dashboard";
  const key = segments.slice(0, 2).join("/");
  return `/${key}` as PermissionScope["canAccess"][number];
};

export default auth((req) => {
  if (!req.auth?.user) {
    const url = new URL("/auth/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const role = (req.auth.user.role as Role | undefined) ?? Role.CONTRACTOR;
  const normalized = normalizePath(pathname);
  if (!canAccessPath(role, normalized)) {
    const url = new URL("/dashboard", req.nextUrl.origin);
    url.searchParams.set("denied", normalized);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
