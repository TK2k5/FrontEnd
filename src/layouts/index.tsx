import Header from './components/header'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { ProductProvider } from '@/contexts/product-contex'
import SideBar from './components/sidebar'
import { TProduct } from '@/types/product.type'

const RootLayout = () => {
  const data: TProduct[] = [
    { id: '1', name: 'Product 1', price: 100 },
    { id: '2', name: 'Product 2', price: 200 },
    { id: '3', name: 'Product 3', price: 300 },
    { id: '4', name: 'Product 4', price: 400 },
    { id: '5', name: 'Product 5', price: 500 }
  ]
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
          <ProductProvider data={data}>
            <Outlet />
          </ProductProvider>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default RootLayout
