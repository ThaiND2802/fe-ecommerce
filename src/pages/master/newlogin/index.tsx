import HeroPanel from './components/organisms/HeroPanel'
import SignupCard from './components/organisms/SignupCard'

import styles from './index.module.less'

const NewLoginPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.page__media}>
        <HeroPanel />
      </div>
      <div className={styles.page__content}>
        <SignupCard />
      </div>
    </main>
  )
}

export default NewLoginPage
