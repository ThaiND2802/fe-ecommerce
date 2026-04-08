import { ComponentProps, useEffect, useCallback } from 'react'
import { Flex } from 'antd'
import {
  DayCellContentArg,
  DayHeaderContentArg,
  SlotLabelContentArg,
} from '@fullcalendar/core/index.js'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import viLocale from '@fullcalendar/core/locales/vi'
import enLocale from '@fullcalendar/core/locales/en-gb'
import dayjs from 'dayjs'
import cn from 'classnames'

import IconSax from 'src/lib/components/IconSax'
import i18n from 'src/locales/i18n'

import styles from './index.module.less'

const localeMap = {
  vi: 'vi',
  en: 'en-gb',
}

type FullCalendarProps = ComponentProps<typeof FullCalendar>
interface CalendarProps extends FullCalendarProps {
  ref?: React.RefObject<FullCalendar>
  className?: string
  initialLocale?: string
  cellCreateButton?: boolean
  onCreateNewEvent?: (arg: DayCellContentArg) => void
}

const CreateButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Flex className="btn-create" title="Create" onClick={onClick}>
      <IconSax name="add" size={14} />
    </Flex>
  )
}

const Calendar = ({
  className,
  ref,
  cellCreateButton,
  onCreateNewEvent,
  initialLocale,
  ...props
}: CalendarProps) => {
  const renderCellContent = (arg: DayCellContentArg) => {
    return (
      <Flex align="center" justify="center" className={styles.cellContent}>
        <span className={styles.dayNumberText}>{arg.dayNumberText}</span>
        {cellCreateButton && (
          <CreateButton
            onClick={() => {
              onCreateNewEvent?.(arg)
            }}
          />
        )}
      </Flex>
    )
  }

  const renderSlotLabelContent = (arg: SlotLabelContentArg) => {
    return (
      <Flex align="center" justify="center" className={styles.slotLabelContent}>
        <span>{arg.text}</span>
      </Flex>
    )
  }

  const MonthHeaderContent = useCallback((arg: DayHeaderContentArg) => {
    return (
      <>
        <div>{arg.text}</div>
        <div className={styles.subHeaderText}>
          {arg.date.getDate()}/{arg.date.getMonth() + 1}
        </div>
      </>
    )
  }, [])

  const DayHeaderContent = useCallback((arg: DayHeaderContentArg) => {
    const dayjsDate = dayjs(arg.date)
    return (
      <>
        <div>{dayjsDate.format('dddd')}</div>
        <div className={styles.subHeaderText}>{dayjsDate.format('DD/MM')}</div>
      </>
    )
  }, [])

  useEffect(() => {
    i18n.on('languageChanged', (language) => {
      ref.current?.getApi().setOption('locale', localeMap[language])
    })

    return () => {
      i18n.off('languageChanged')
    }
  }, [])

  return (
    <div className={cn(styles.calendar, className)}>
      <FullCalendar
        ref={ref}
        locales={[viLocale, enLocale]}
        locale={initialLocale}
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
        firstDay={1}
        headerToolbar={false}
        dayCellContent={renderCellContent}
        slotLabelContent={renderSlotLabelContent}
        views={{
          dayGridMonth: {
            dayHeaderFormat: { weekday: 'long' },
          },
          timeGridWeek: {
            dayHeaderFormat: {
              weekday: 'long',
            },
            dayHeaderContent: MonthHeaderContent,
          },
          timeGridDay: {
            dayHeaderFormat: {
              weekday: 'long',
            },
            dayHeaderContent: DayHeaderContent,
          },
        }}
        {...props}
      />
    </div>
  )
}

export default Calendar
