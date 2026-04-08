const CURRENCY_FORMAT_MAP = {
  VND: 'vi-VN',
  USD: 'en-US',
}

const CURRENCY_NAME_MAP = {
  VND: 'VNĐ',
  USD: 'USD',
}

export const CURRENCY_SEPARATOR_MAP = {
  VND: '.',
  USD: ',',
}

export const DECIMAL_SEPARATOR_MAP = {
  '.': ',',
  ',': '.',
}

export const formatValueByCurrency = (value: number, currency: string) => {
  return value?.toLocaleString(CURRENCY_FORMAT_MAP[currency] || CURRENCY_FORMAT_MAP.VND)
}

export const toCurrency = (currency: string) => {
  return CURRENCY_NAME_MAP[currency] || currency || ''
}

export const toMoneyWithCurrency = (value: number, currency: string) => {
  if (value === undefined || value === null) return ''
  return `${formatValueByCurrency(value, currency)} ${toCurrency(currency)}`
}

export const groupNumber = (value: number, separator: string = '.') => {
  const [intPart, decPart] = value.toString().split('.')
  const locale = separator === '.' ? 'vi-VN' : 'en-US'
  const withSeparator = Number(intPart).toLocaleString(locale)
  return decPart ? `${withSeparator}${DECIMAL_SEPARATOR_MAP[separator]}${decPart}` : withSeparator
}
