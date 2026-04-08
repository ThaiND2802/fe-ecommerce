import dayjs from 'dayjs'
import i18n from 'i18next'

export const formatDate = (date: string) => {
  return dayjs(date || '').format(i18n.t('setting.dateFormat'))
}

export const formatDateWithTime = (date: string) => {
  return dayjs(date).format(i18n.t('setting.dateTimeFormat'))
}
