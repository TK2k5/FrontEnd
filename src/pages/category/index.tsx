/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table, TableColumnsType, Tag } from 'antd'

import FormCategory from './components/form'
import Navbar from '@/components/navbar'
import { TCategory } from '@/types/category.type'
import { getCategories } from '@/apis/category.api'
import { useAuth } from '@/contexts/auth-context'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useToggleModal } from '@/hooks/useToggleModal'

const CategoryPage = () => {
  // const navigate = useNavigate()
  const { accessToken } = useAuth()
  const { currentModal, onCloseModal, onOpenModal } = useToggleModal<TCategory>()
  const params = useQueryParams()
  console.log('🚀 ~ CategoryPage ~ params:', params)
  // categories
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(accessToken)
  })
  const categories = data?.data
  const columns: TableColumnsType<TCategory> = [
    {
      title: 'Thông tin danh mục',
      dataIndex: 'nameCategory',
      key: 'nameCategory',
      render: (nameCategory: string, record: TCategory) => {
        return (
          <div className='flex gap-3'>
            <img
              src={record.image ?? 'https://picsum.photos/536/354'}
              alt={record.nameCategory}
              className='w-[50px] flex-shrink-0 h-[50px] object-cover rounded-[5px]'
            />
            <div className='flex items-center gap-2'>
              <p className='!text-lg font-medium text-black-second'>{nameCategory}</p>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const isActive = status === 'active'
        return <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Hoạt động' : 'Không hoạt động'}</Tag>
      }
    }
  ]
  const handleSearch = (nameCategory: any) => {
    console.log('🚀 ~ handleSearch ~ nameCategory:', nameCategory === 123)
    // navigate({
    //   pathname: '/category',
    //   search: createSearchParams({
    //     ...params,
    //     search: string
    //   }).toString()
    // })
  }
  return (
    <div className='bg-gray-third py-[30px] px-[30px]'>
      <Navbar
        button={{
          title: 'Thêm danh mục sản phẩm',
          size: 'large',
          type: 'primary',
          onClick: () => onOpenModal('add')
        }}
        input={{
          placeholder: 'Tìm kiếm danh mục sản phẩm',
          onSearch: handleSearch
        }}
      />
      <div>
        <Table loading={isLoading} rowKey={(record) => record._id} dataSource={categories} columns={columns} />
      </div>
      <FormCategory currentData={currentModal} onClose={onCloseModal} />
    </div>
  )
}
export default CategoryPage
