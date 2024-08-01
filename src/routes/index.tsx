import HomePage from '@/pages'
import OrderPage from '@/pages/orders'
import ProductPage from '@/pages/products'
import RootLayout from '@/layouts'
import { createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'orders', element: <OrderPage /> }
    ]
  }
])

export default routes
