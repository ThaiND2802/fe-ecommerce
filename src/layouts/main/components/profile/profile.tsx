import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Row, Typography } from 'antd'

import { formatDate } from 'src/utils/date'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { useUser } from 'src/hook/use-user'
import Modal from 'src/components/Modal'
import { formatBase64Image } from 'src/utils/string.utils'

import styles from './profile.module.less'

interface IProfileProps {
  open: boolean
  onClose: () => void
}

const Profile: React.FunctionComponent<IProfileProps> = ({ open, onClose }: IProfileProps) => {
  const [t] = useLocaleGroup('profile')
  const { data: userInfo } = useUser(true)

  const fields = [
    {
      id: 'companyName',
      label: t.label.information.companyName,
    },
    {
      id: 'code',
      label: t.label.information.staffId,
    },
    {
      id: 'job',
      label: t.label.information.job,
    },
    {
      id: 'position',
      label: t.label.information.position,
    },
    {
      id: 'ext',
      label: t.label.information.ext,
    },
    {
      id: 'phone',
      label: t.label.information.phone,
    },
    {
      id: 'manager',
      label: t.label.information.manager,
    },
    {
      id: 'email',
      label: t.label.information.email,
    },
    {
      id: 'startDate',
      label: t.label.information.startDate,
    },
  ]

  return (
    <Modal
      className={styles.modal}
      noTitle
      open={open}
      width={542}
      footer={null}
      onCancel={onClose}
      style={{ maxHeight: '570px' }}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.header_bg}>
              <div className={styles.header_bg_title}>
                <Row gutter={[12, 12]} align={'middle'}>
                  <Col>
                    <div className={styles.header_bg_title_avatar}>
                      <Avatar
                        src={formatBase64Image(userInfo?.image)}
                        size={120}
                        icon={<UserOutlined />}
                      />
                    </div>
                  </Col>
                  <Col>
                    <Typography className={styles.header_bg_title_name}>
                      {userInfo?.fullName}
                    </Typography>
                    <Typography className={styles.header_bg_title_deparment}>
                      {userInfo?.department}
                    </Typography>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <Row gutter={[12, 12]} justify={'space-between'}>
              <Col span={14}>
                <div className={styles.content_information}>
                  {userInfo &&
                    fields.map(({ id: infoKey, label }) => {
                      if (userInfo) {
                        let value
                        value = userInfo[infoKey as keyof typeof userInfo]
                        if (infoKey === 'startDate') value = formatDate(userInfo[infoKey])

                        if (label && value !== '')
                          return (
                            <Row key={infoKey} style={{ marginBottom: 10 }}>
                              <Col span={9}>
                                <Typography className={styles.textBold}>{label}:</Typography>
                              </Col>
                              <Col span={15}>
                                <Typography>{value as string}</Typography>
                              </Col>
                            </Row>
                          )
                      }
                    })}
                </div>
              </Col>
              <Col span={10}>
                <div className={styles.content_digital}>
                  <Typography className={styles.textBold}>{t.label.digitalSign}:</Typography>
                  {userInfo?.signature && (
                    <img
                      src={formatBase64Image(userInfo?.signature)}
                      alt="signature"
                      style={{ width: '100%' }}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Profile
