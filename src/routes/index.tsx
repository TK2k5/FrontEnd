import AuthLayout from '@/layouts/auth-layout'
import HomePage from '@/pages'
import IconPage from '@/pages/icons'
import LoginPage from '@/pages/(authen)/login'
import OrderPage from '@/pages/orders'
import ProductPage from '@/pages/products'
import RootLayout from '@/layouts'
import { createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path: '/icons',
    element: <IconPage />
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'orders', element: <OrderPage /> }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <LoginPage /> }]
  }
])

export default routes
