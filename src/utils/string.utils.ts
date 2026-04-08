export const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function uniqueKey(len: number, prefix = 'tms_elm') {
  let result = ''

  const charactersLength = CHARS.length
  for (let i = 0; i < len; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * charactersLength))
  }
  return `${prefix}_${result}`
}

export function formatCurrency(n: string | number | undefined, separator?: string): string {
  if (!n && n !== 0) {
    return ''
  }
  const val = Number(n)
  if (isNaN(val)) {
    return ''
  }
  return `${val.toLocaleString('en-us')}`.replaceAll(/,/g, separator ?? '.')
}

export function formatBase64Image(input?: string) {
  if (!input) return
  if (input.startsWith('http')) {
    return input
  }
  return `data:image/png;base64, ${input}`
}
