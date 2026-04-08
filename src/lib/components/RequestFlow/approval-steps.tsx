import { Flex } from 'antd'
import classNames from 'classnames'

import UserAvatar from '../UserAvatar'
import Ellipsis from '../Ellipsis'
import Link from '../Link'
import IconSax from '../IconSax'
import Icon from '../Icon'
import Tag from '../Tag'
import ContactPopover from '../ContactPopover'
import useLocale from '../../locales/useLocale'
import { EProcessStepStatus, IProcessStep } from '../../entities/approval/types'
import { formatDateWithTime } from '../../utils/date'

import styles from './approval-steps.module.less'

interface StepInfo {
  id: string
  stepName?: string
  duration: string
  dueDate: string
  assignees: IProcessStep['assignees']
  status: EProcessStepStatus
}

interface IProps {
  items: StepInfo[]
  start?: number
  isEnd?: boolean
}

const ApprovalStep = ({ items, start = 0, isEnd = false }: IProps) => {
  const itemsLength = items.length
  const [t, trans] = useLocale('RequestFlow')

  return (
    <Flex vertical className={styles.approvalSteps}>
      {items.map((item, index) => (
        <Flex
          key={item.id}
          className={classNames(styles.approvalStep, {
            [styles.line]: !isEnd || (isEnd && index !== itemsLength - 1),
            [styles.lastLine]: index === itemsLength - 1,
          })}>
          <Flex
            className={classNames(styles.step, {
              [styles.active]: item.status === EProcessStepStatus.Active,
              [styles.completed]: item.status === EProcessStepStatus.Completed,
            })}>
            {item.status === EProcessStepStatus.Completed ? (
              <Flex className={styles.completedIcon}>
                <Icon name="checks" size={12} />
              </Flex>
            ) : (
              index + start + 1
            )}
          </Flex>

          <Flex className={styles.flex1} vertical>
            {item.assignees.map((assignee) => (
              <Flex className={styles.assignee} key={assignee.id} gap={5}>
                <UserAvatar
                  className={styles.avatar}
                  size={28}
                  iconSize={10}
                  image={assignee.avatar}
                />
                <Flex gap={2} className={styles.info}>
                  <Flex vertical className={styles.infoContent}>
                    <div className={styles.userNameEmail}>
                      <ContactPopover userId={assignee.id} placement="bottom">
                        <span className={styles.userName}>{assignee.name}</span>
                      </ContactPopover>

                      {!!assignee.title && (
                        <>
                          <span className={styles.separator}>-</span>
                          <span className={styles.userRole}>{assignee.title}</span>
                        </>
                      )}
                    </div>

                    {assignee.delegation && (
                      <Ellipsis className={styles.delegation}>
                        {trans(t.delegation, { name: assignee.delegation })}
                      </Ellipsis>
                    )}
                    {assignee.by_pass && (
                      <div>
                        <Tag className={styles.bypass} color="red" noBorder>
                          {assignee.by_pass}
                        </Tag>
                      </div>
                    )}
                    {!!assignee.received_date && (
                      <Flex className={styles.date}>
                        {trans(t.recievedDate, {
                          date: formatDateWithTime(assignee.received_date),
                        })}
                      </Flex>
                    )}
                    {!!assignee.action_date && (
                      <Flex className={styles.date}>
                        {trans(t.processedDate, { date: formatDateWithTime(assignee.action_date) })}{' '}
                        <Tag
                          className={styles.durationTag}
                          color={assignee.is_delay ? 'red' : 'green'}
                          noBorder>
                          {assignee.delay_time}
                        </Tag>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            ))}

            <Flex className={styles.stepDuration}>
              <Flex align="center" gap={5}>
                <IconSax name="flag-1" size={18} />
                <Link className={styles.stepName}>{item.stepName}</Link>
              </Flex>
              {item.duration || item.dueDate ? (
                <Flex className={styles.duration}>
                  <IconSax name="stopwatch" size={18} />
                  {!!item.duration && <span>{item.duration}</span>}
                  {!!item.duration && !!item.dueDate && <span>-</span>}
                  {!!item.dueDate && <span>{formatDateWithTime(item.dueDate)}</span>}
                </Flex>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default ApprovalStep
