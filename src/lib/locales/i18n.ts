import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'
import vi from './vi'
import { getEncryptedItem } from '../utils/storage'

export const LANGUAGES = {
  en: 'en',
  vi: 'vi',
}

const resources = { vi, en }

const libI18n = i18n.createInstance()

libI18n.use(initReactI18next).init({
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
  libI18n.changeLanguage(event.detail.language)
})

export default libI18n
