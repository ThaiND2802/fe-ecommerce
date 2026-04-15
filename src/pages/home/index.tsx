import Page from 'src/lib/components/Page'
import Header from './components/Header'
import Table from './components/Table'
import Drawer from './components/Drawer'

const Index = () => {
  return (
    <Page header={<Header />}>
      <Table />
      <Drawer />
    </Page>
  )
}

export default Index
