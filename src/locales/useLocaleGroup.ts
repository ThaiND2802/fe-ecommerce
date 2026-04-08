import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

import en from './en'

const { translation } = en

const useLocaleGroup = <K extends keyof typeof translation>(
  group: K,
): [(typeof translation)[K], TFunction] => {
  const { t } = useTranslation()

  const toTranslate = translation[group] || {}

  const tranObj = (obj, translated, keyPrefix: string) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'string') {
        translated[key] = t(`${keyPrefix}.${key}`)
      } else if (typeof obj[key] === 'object') {
        translated[key] = tranObj(obj[key], {}, `${keyPrefix}.${key}`)
      }
    })
    return translated
  }

  return [tranObj(toTranslate, {}, group), t]
}

export default useLocaleGroup
