export function isSafeUrl(url: string): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url, globalThis.location.origin)
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)
  } catch {
    return false
  }
}
