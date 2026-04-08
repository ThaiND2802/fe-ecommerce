import SocialButton from '../../atoms/SocialButton'
import Divider from '../../molecules/Divider'

import styles from './index.module.less'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { Form, Input } from 'antd'
import FormItem from 'src/lib/components/FormItem'
import IconSax from 'src/lib/components/IconSax'
import useData from './hook'

const GoogleIcon = () => {
  return (
    <svg viewBox="0 0 29 29" aria-hidden="true" className={styles.socialIcon}>
      <path fill="#EA4335" d="M7.505 8.012c1.564-1.583 3.655-2.475 5.913-2.475 1.962 0 3.833.674 5.316 1.915l3.957-3.957C20.01 1.143 16.853 0 13.418 0 8.133 0 3.561 3.035 1.34 7.468l4.758 3.688c.609-1.181 1.48-2.267 1.407-3.144Z" />
      <path fill="#FBBC05" d="M1.34 7.468A14.36 14.36 0 0 0 0 13.418c0 2.266.524 4.414 1.455 6.324l5.547-4.277A8.622 8.622 0 0 1 6.61 13.4c0-.783.098-1.545.282-2.244L1.34 7.468Z" />
      <path fill="#34A853" d="M13.418 29c3.358 0 6.514-1.103 8.945-3.18l-4.37-3.378c-1.228.824-2.781 1.3-4.575 1.3-3.31 0-6.116-2.235-7.125-5.26L1.455 19.74C3.66 24.13 8.19 29 13.418 29Z" />
      <path fill="#4285F4" d="M28.44 14.826c0-.93-.08-1.824-.25-2.685H13.418v5.52h8.469c-.367 1.977-1.492 3.646-3.894 5.281l4.37 3.378C25.9 23.046 28.44 19.4 28.44 14.826Z" />
    </svg>
  )
}

const FacebookIcon = () => {
  return (
    <svg viewBox="0 0 29 29" aria-hidden="true" className={styles.socialIcon}>
      <path fill="#1877F2" d="M29 14.5C29 6.492 22.508 0 14.5 0S0 6.492 0 14.5C0 21.736 5.302 27.734 12.234 28.822V18.69H8.55V14.5h3.684v-3.193c0-3.637 2.166-5.645 5.478-5.645 1.587 0 3.247.283 3.247.283v3.57h-1.83c-1.803 0-2.365 1.119-2.365 2.267V14.5h4.025l-.644 4.19h-3.38v10.132C23.698 27.734 29 21.736 29 14.5Z" />
      <path fill="#FFF" d="M20.145 18.69l.644-4.19h-4.025v-2.718c0-1.148.562-2.267 2.365-2.267h1.83v-3.57s-1.66-.283-3.247-.283c-3.312 0-5.478 2.008-5.478 5.645V14.5H8.55v4.19h3.684v10.132c.745.117 1.508.178 2.266.178.758 0 1.521-.061 2.266-.178V18.69h3.38Z" />
    </svg>
  )
}

const SignupCard = () => {
  const [t] = useLocaleGroup('login');

  const { form, onSubmit, isPending } = useData()

  return (
    <section className={styles.cardSection} aria-label="Sign up form">
      <div className={styles.card}>
        <header className={styles.card__header}>
          <h2 className={styles.card__title}>{t.label.signIn}</h2>
        </header>

        <Form className={styles.form} form={form} >
          <div className={styles.form__fields}>
            <FormItem className={styles.form__item} name="username" label={false}>
              <Input prefix={<IconSax className={styles.form__icon} name='user-2' size={18} />} size='large' placeholder={t.label.username} />
            </FormItem>
            <FormItem className={styles.form__item} name="password" label={false}>
              <Input.Password prefix={<IconSax className={styles.form__icon} name='lock-1' size={18} />} size='large' placeholder={t.label.password} />
            </FormItem>
          </div>

          <button className={styles.form__forgotPassword} type="button">
            {t.label.forgotPassword}
          </button>

          <button className={styles.form__submit} type="submit" onClick={onSubmit} disabled={isPending}>
            {t.label.signIn}
          </button>
        </Form>

        <div className={styles.card__socials}>
          <Divider label={t.label.dividerLabel} />

          <div className={styles.card__socialButtons}>
            <SocialButton disabled={true} icon={<GoogleIcon />} label={t.label.google} />
            <SocialButton disabled={true} icon={<FacebookIcon />} label={t.label.facebook} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupCard
