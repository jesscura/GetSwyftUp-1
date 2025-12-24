export function isSafeRedirect(url: string | null | undefined, baseOrigin?: string) {
  if (!url) return false;
  const origin = baseOrigin ?? (typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL);
  if (!origin) return false;
  try {
    const parsed = new URL(url, origin);
    return parsed.origin === origin;
  } catch {
    return url.startsWith("/") && !url.startsWith("//");
  }
}
