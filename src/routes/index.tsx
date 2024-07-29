import HomePage from '@/pages'
import RootLayout from '@/layouts'
import { createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }]
  }
])

export default routes
