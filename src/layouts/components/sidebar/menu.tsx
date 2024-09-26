import { AppstoreOutlined } from '@ant-design/icons'
import { DashboardIcon } from '@/components/icons'

export const menus = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <DashboardIcon className='fill-inherit' />,
    link: '/'
  },
  {
    id: 2,
    title: 'Các đơn hàng',
    icon: <AppstoreOutlined />,
    link: '/orders'
  },
  {
    id: 3,
    title: 'Sản phẩm',
    icon: <AppstoreOutlined />,
    link: '/products'
  },
  {
    id: 4,
    title: 'Danh mục sản phẩm',
    icon: <AppstoreOutlined />,
    link: '/category'
  }
]
