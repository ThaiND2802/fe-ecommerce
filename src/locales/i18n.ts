import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'
import vi from './vi'
import { getEncryptedItem } from 'src/lib/utils/storage'

export const LANGUAGES = {
  en: 'en',
  vi: 'vi',
}

const resources = { vi, en }

i18n.use(initReactI18next).init({
  initImmediate: false,
  debug: false,
  resources: resources,
  fallbackLng: LANGUAGES.en,
  react: {
    useSuspense: true,
  },
  interpolation: {
    escapeValue: false,
  },
  lng: getEncryptedItem('user_language'),
})

globalThis.addEventListener('languageChanged', (event: CustomEvent) => {
  console.log(event.detail.language)
  i18n.changeLanguage(event.detail.language)
})

export default i18n
