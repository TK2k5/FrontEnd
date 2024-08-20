/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Input, Modal, Table, Tooltip, notification } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { TCategroyRefProduct, TProduct, TSize } from '@/types/product.type'
import { TImage, TResponse } from '@/types/common.type'
import { getProducts, softDeleteProduct } from '@/apis/product.api'
import { useEffect, useState } from 'react'

import { GlassesIcon } from '@/components/icons'
import type { TableColumnsType } from 'antd'
import { useAuth } from '@/contexts/auth-context'

const ProductPage = () => {
  const queryClient = new QueryClient()

  const { accessToken } = useAuth()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [products, setProducts] = useState<TProduct[]>([])
  const [id, setId] = useState<string>('')

  const [paginate, setPaginate] = useState({
    _page: 1,
    _limit: 2,
    totalPages: 1
  })
  const [queryDelete, setQueryDelete] = useState<{ status: 'active' | 'inactive'; is_deleted: boolean }>({
    status: 'active',
    is_deleted: true
  })

  const deleteMutation = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: () =>
      softDeleteProduct(id, `?status=${queryDelete.status}&is_deleted=${queryDelete.is_deleted}`, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', paginate] })
      notification.success({
        message: 'Xoá sản phẩm thành công',
        description: 'Sản phẩm đã được xoá vào thùng rác'
      })
    },
    onError: () => {
      notification.error({
        message: 'Xoá sản phẩm thất bại',
        description: 'Có lỗi xảy ra khi xoá sản phẩm'
      })
    }
  })

  const { data, isError, isLoading, isSuccess } = useQuery<TResponse<TProduct>, Error>({
    queryKey: ['products', paginate],
    queryFn: () => getProducts(accessToken, `?_page=${paginate._page}&_limit=${paginate._limit}`),
    keepPreviousData: true
  })

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.docs)
      setPaginate({
        _page: data.page,
        _limit: data.limit,
        totalPages: data.totalPages
      })
    }
  }, [isSuccess, data])

  const handelDeleteProduct = () => {
    deleteMutation.mutate()
  }

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const columns: TableColumnsType<TProduct> = [
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'images',
      key: 'images',
      render: (images: TImage[], record: TProduct) => {
        return (
          <div className='flex gap-3'>
            <img
              src={images[0].url ? images[0].url : 'https://picsum.photos/536/354'}
              alt={images[0].public_id}
              className='w-[50px] flex-shrink-0 h-[50px] object-cover rounded-[5px]'
            />

            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <p className='!text-lg font-medium text-black-second'>{record.nameProduct}</p>
                {record.sale > 0 && (
                  <div className='!text-xs bg-red-400 text-white rounded-sm p-0.5 px-2'>
                    Sale: {record.sale.toLocaleString()}đ
                  </div>
                )}
              </div>
              <p className='!text-xs text-slate-800 flex items-center gap-3'>
                <span className=''>{(record.price - record.sale).toLocaleString()}đ</span>
                <span className='text-gray-300 line-through'>{record.price.toLocaleString()}đ</span>
              </p>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: TCategroyRefProduct, record, index) => {
        return category.nameCategory
      }
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand: TCategroyRefProduct) => {
        return brand.nameBrand
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_deleted',
      key: 'is_delete',
      render: (id_delete: boolean) => {
        return id_delete ? 'Đã xoá' : 'Đang hoạt động'
      }
    },
    {
      title: 'Available Color',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (sizes: TSize[], record: TProduct) => {
        return (
          <div className='flex items-center gap-3'>
            {sizes.map((size) => (
              <Tooltip
                key={size._id}
                title={
                  <ul className='min-w-[150px] list-disc p-4'>
                    <li>Tên size: {size.size}</li>
                    <li>Màu sắc: {size.color}</li>
                    <li>Số lượng: {size.quantity}</li>
                  </ul>
                }
              >
                <div
                  className='w-[20px] h-[20px] rounded-full shadow-xl shadow-black border border-x-gray-light cursor-pointer'
                  style={{ backgroundColor: size.color }}
                />
              </Tooltip>
            ))}
          </div>
        )
      }
    },
    {
      title: 'Active',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, record: TProduct) => {
        return (
          <div className='flex items-center'>
            <button className='h-8 px-4 border border-r-0 border-gray-400 rounded-r-none rounded-l-md '>
              <EditOutlined height={20} width={20} />
            </button>
            <Tooltip title={'Xoá sản phẩm'}>
              <button
                className='h-8 px-4 border border-gray-400 rounded-l-none rounded-r-md '
                onClick={() => {
                  setOpenModalDelete(true)
                  setId(record._id), setQueryDelete({ is_deleted: !record.is_deleted, status: record.status })
                }}
              >
                <DeleteOutlined height={20} width={20} className='text-red-600' />
              </button>
            </Tooltip>
          </div>
        )
      }
    }
  ]

  return (
    <div className='bg-gray-third py-[30px] px-[30px]'>
      <div className='flex items-center justify-between w-full pb-7'>
        <p className='font-bold text-black-second text-[32px] font-nunito-sans'>Product management</p>

        <Input
          className='h-[38px] rounded-[50px] w-[250px] border border-gray-six'
          placeholder='Search for product'
          prefix={<GlassesIcon hanging={16} width={16} />}
        />
      </div>

      <div className=''>
        <Table
          rowKey={(record) => record._id}
          dataSource={products}
          columns={columns}
          pagination={{
            current: data.page,
            pageSize: data.limit,
            total: data.totalDocs,
            onChange: (page) => {
              setPaginate({ ...paginate, _page: page, _limit: paginate._limit })
            },
            // showing
            showTotal(total, range) {
              return (
                <div className='flex items-center justify-between w-full mr-auto text-black-second'>
                  Showing {range[0]}-{range[1]} of {total}
                </div>
              )
            }
          }}
        />
      </div>

      <Modal
        open={openModalDelete}
        title={<p className='w-full text-2xl font-semibold text-center'>Xoá sản phẩm</p>}
        onOk={() => {
          setOpenModalDelete(false)
        }}
        closable={false}
        onCancel={() => setOpenModalDelete(false)}
        footer={
          <div className='flex items-center justify-center gap-10 mt-10'>
            <Button danger size='large' className='w-full max-w-[140px]' onClick={() => setOpenModalDelete(false)}>
              Huỷ
            </Button>
            <Button
              type='primary'
              size='large'
              className='w-full max-w-[140px]'
              onClick={() => {
                handelDeleteProduct()
                setOpenModalDelete(false)
              }}
            >
              Xoá sản phẩm
            </Button>
          </div>
        }
      >
        <p className='text-center text-gray-500'>
          Bạn có chắc chắn muốn xoá sản phẩm này không? Hành động này không thể hoàn tác?
        </p>
      </Modal>
    </div>
  )
}

export default ProductPage
