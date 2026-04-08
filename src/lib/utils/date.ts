import dayjs from 'dayjs'
import 'dayjs/plugin/isoWeek'

import i18n from '../locales/i18n'

export const formatDate = (date: string) => {
  if (!date) return ''
  return dayjs(date || '').format(i18n.t('setting.dateFormat'))
}

export const formatDateWithTime = (date: string) => {
  if (!date) return ''
  return dayjs(date).format(i18n.t('setting.dateTimeFormat'))
}

export const isPast = (date: string) => {
  return dayjs(date).isBefore(dayjs())
}

export const parseDateWithTime = (
  date: string,
  time: string,
  dateFormat: string,
  timeFormat: string,
) => {
  return dayjs(`${date} ${time}`, `${dateFormat} ${timeFormat}`)
}
