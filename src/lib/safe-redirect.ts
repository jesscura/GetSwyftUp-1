export function isSafeRedirect(url: string | null | undefined) {
  if (!url) return false;
  if (typeof window === "undefined") return false;
  const origin = window.location.origin;
  try {
    const parsed = new URL(url, origin);
    return parsed.origin === origin;
  } catch {
    return url.startsWith("/") && !url.startsWith("//");
  }
}
