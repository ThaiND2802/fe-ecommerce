import styles from './index.module.less'

const HeroPanel = () => {
  return (
    <section className={styles.hero} aria-label="Inspirational message">
      <div className={styles.hero__overlay} />
      <div className={styles.hero__quoteMark}>“</div>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>
          The only way to do <strong>great work</strong> is to <strong>love what you do.</strong>
        </h1>
        <p className={styles.hero__author}>{'-Steve Jobs'}</p>
      </div>
    </section>
  )
}

export default HeroPanel
