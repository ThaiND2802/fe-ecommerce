import PageHeader from 'src/lib/components/PageHeader'
import useLocaleGroup from 'src/locales/useLocaleGroup'

const Index = () => {
  const [t] = useLocaleGroup('menu')
  return <PageHeader title={t.home} />
}

export default Index
