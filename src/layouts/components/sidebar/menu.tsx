import { AppstoreOutlined, ProductOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

import type { MenuProps } from 'antd'

export type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: '1', icon: <AppstoreOutlined height={22} width={22} />, label: 'DashBoard' },
  { key: '2', icon: <ShoppingCartOutlined height={22} width={22} />, label: 'Các đơn hàng' },
  { key: '3', icon: <ProductOutlined height={22} width={22} />, label: 'Sản phẩm' },
  { key: '4', icon: <UserOutlined height={22} width={22} />, label: 'Người dùng' }
]

export default items
