import { FloatButton, Layout } from 'antd'
import { Link, Outlet } from 'react-router-dom'

import Header from './components/header'
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
          <Link to={`/messagers`}>
            <FloatButton tooltip={<div>Documents</div>} />
          </Link>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default RootLayout
