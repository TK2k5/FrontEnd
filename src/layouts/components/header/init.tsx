import { MenuProps } from 'antd'

export const items: MenuProps['items'] = [
  {
    key: '1',
    label: <p className=''>English</p>
  },
  {
    key: '2',
    label: <p className=''>Vietnamese</p>
  }
]

export const itemsUser: MenuProps['items'] = [
  {
    key: '1',
    label: <p className=''>Profile</p>
  },
  {
    key: '2',
    label: <p className=''>Settings</p>
  },
  {
    key: '3',
    label: <p className=''>Logout</p>
  }
]
