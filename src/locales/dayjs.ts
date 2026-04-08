import dayjs from 'dayjs'
import dayjsUpdateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/vi'
import 'dayjs/locale/en'
import { getEncryptedItem } from 'src/lib/utils/storage'
import i18n, { LANGUAGES } from './i18n'

dayjs.extend(dayjsUpdateLocale)

dayjs.updateLocale(LANGUAGES.en, {
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  months:
    'January_February_March_April_May_June_July_August_September_October_November_December'.split(
      '_',
    ),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
})

dayjs.updateLocale(LANGUAGES.vi, {
  weekdays: 'Chủ nhật_Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy'.split('_'),
  months:
    'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split(
      '_',
    ),
  weekStart: 1,
  weekdaysShort: 'Chủ nhật_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7'.split('_'),
  monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
  weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
})

dayjs.locale(getEncryptedItem('user_language'))
i18n.on('languageChanged', (language) => {
  dayjs.locale(language)
})
