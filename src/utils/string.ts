import dayjs from 'dayjs'

export const normalizeText = (text: string) => {
  return (text || '').normalize('NFD').replaceAll(/[\u0300-\u036f]/g, '')
}

export const stringSearch = (str: string, search: string) => {
  return normalizeText(str).toLocaleLowerCase().includes(normalizeText(search).toLowerCase())
}

export const isNumeric = (value: string) => {
  return !Number.isNaN(Number(value)) && value.trim() !== ''
}

/**
 * Encode string to Base64 with Unicode support
 * Uses TextEncoder to safely handle Unicode characters
 * This creates a Base64 string that can be decoded with atob() on backend
 */
export const encodeBase64Unicode = (str: string): string => {
  try {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(str)
    let binaryString = ''
    for (const byte of bytes) {
      binaryString += String.fromCodePoint(byte)
    }
    return globalThis.btoa(binaryString)
  } catch (error) {
    console.error('Error encoding to Base64:', error)
    return ''
  }
}

/**
 * Check if a value is a valid date (dayjs object or date string with proper format)
 * Excludes pure number strings like '0011', '0010' which dayjs incorrectly parses as dates
 */
const isValidDate = (value: any): boolean => {
  // Check if it's a dayjs object (from DatePicker)
  if (value && typeof value.isValid === 'function' && typeof value.toISOString === 'function') {
    return value.isValid()
  }

  // If it's a pure number string (like '0011', '0010'), it's not a date
  const stringValue = String(value)
  if (/^\d+$/.test(stringValue)) {
    return false
  }

  // Check if dayjs can parse it and it has date-like format
  const parsed = dayjs(value)
  if (!parsed.isValid()) {
    return false
  }

  // Verify it has date-like format (contains /, -, T, or is longer than 8 chars)
  return typeof value === 'string'
    ? (value.includes('/') || value.includes('-') || value.includes('T') || value.length > 8)
    : true
}

/**
 * Format array of dates to ISO string format
 */
const formatDateArray = (dates: any[]): any[] => {
  return dates.map((date) => dayjs.isDayjs(date) ? date.toISOString() : dayjs(date).toISOString())
}

/**
 * Format array value (either dates or regular array)
 */
const formatArrayValue = (value: any[]): any[] => {
  if (isValidDate(value[0]) && isValidDate(value[1])) {
    return formatDateArray(value)
  }
  // Case value is object
  if (typeof value[0] === 'object') {
    return value.map((item) => JSON.stringify(item))
  }
  return value;
}

/**
 * Format data to base64 string for search
 */
export const formatDataToBase64String = (data: Record<string, any>): string => {
  const dataformatted: Record<string, any> = {}

  for (const [key, value] of Object.entries(data)) {
    dataformatted[key] = Array.isArray(value) ? formatArrayValue(value) : value
  }

  return encodeBase64Unicode(JSON.stringify(dataformatted))
}