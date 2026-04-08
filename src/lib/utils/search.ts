import { normalizeText } from './normalizeText'

export const textSearch = (str: string, search: string) => {
  return normalizeText(str)
    .toLocaleLowerCase()
    .includes(normalizeText(search?.trim() || '').toLowerCase())
}
