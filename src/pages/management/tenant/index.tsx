import Page from 'src/lib/components/Page'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Table from './components/Table'

const Index = () => {
  return (
    <Page header={<Header />}>
      <Table />
      <Drawer />
    </Page>
  )
}

export default Index
