import PageHeader from 'src/lib/components/PageHeader'

import useLocaleGroup from 'src/locales/useLocaleGroup'

const Index = () => {
  const [t] = useLocaleGroup('setting')

  return <PageHeader title={t.generalSetting.title} />
}

export default Index
