import Header from './components/header'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import SideBar from './components/sidebar'

const RootLayout = () => {
  return (
    <Layout className='h-screen'>
      <Layout.Sider width='250px' className='!bg-white'>
        <SideBar />
      </Layout.Sider>
      <Layout>
        <Layout.Header className='!bg-white !px-8'>
          <Header />
        </Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default RootLayout
