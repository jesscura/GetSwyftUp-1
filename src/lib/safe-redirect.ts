export function isSafeRedirect(url: string | null | undefined) {
  if (!url) return false;
  const fallbackOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  try {
    const parsed = new URL(url, fallbackOrigin);
    return parsed.origin === fallbackOrigin;
  } catch {
    return url.startsWith("/") && !url.startsWith("//");
  }
}
