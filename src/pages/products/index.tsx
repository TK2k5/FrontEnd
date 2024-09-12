/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import FomrProduct from './components/form/form-product'
import MainProduct from './components/main-product'
import Navbar from '@/components/navbar'
import { TProduct } from '@/types/product.type'
import { TResponse } from '@/types/common.type'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { getProducts } from '@/apis/product.api'
import { handleChangeTab } from '@/pages/products/utils/handle-change-tab'
import { useAuth } from '@/contexts/auth-context'
import useDebounce from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useToggleModal } from '@/hooks/useToggleModal'

const ProductPage = () => {
  // const queryClient = new QueryClient()

  const { accessToken } = useAuth()

  // get status/deleted from url
  const [params] = useSearchParams()
  const status = params.get('status')
  const deleted = params.get('deleted')
  const page = params.get('_page')

  const [products, setProducts] = useState<TProduct[]>([])
  const navigate = useNavigate()

  const [paginate, setPaginate] = useState({
    _page: 1,
    _limit: 10,
    totalPages: 1
  })

  const { currentModal, onCloseModal, onOpenModal } = useToggleModal<TProduct>()

  const [query, setQuery] = useState<string>(`?_page=${page}&_limit=${paginate._limit}`)
  const { data, isError, isLoading, isSuccess, isFetching, refetch } = useQuery<TResponse<TProduct>, Error>({
    queryKey: ['products', query],
    queryFn: () => getProducts(accessToken, query),
    keepPreviousData: true
  })

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.docs.reverse())
      setPaginate({
        _page: data.page,
        _limit: data.limit,
        totalPages: data.totalPages
      })
    }
  }, [isSuccess, data])

  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue, 1000)

  useEffect(() => {
    if (debouncedValue) {
      let query = `?_page=${paginate._page}&_limit=${paginate._limit}${inputValue !== '' && `&q=${debouncedValue}`}`
      if (status) {
        query += `&status=${status}`
      }
      if (deleted) {
        query += `&deleted=${deleted}`
      }
      setQuery(query)
    }
  }, [debouncedValue, status, deleted, paginate, inputValue])

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tất cả sản phẩm',
      children: (
        <MainProduct
          isLoading={isFetching || isLoading}
          products={products}
          getData={onOpenModal}
          paginate={{
            _page: paginate._page,
            _limit: paginate._limit,
            totalDocs: data.totalDocs,
            onChange: (page) => {
              setPaginate({ ...paginate, _page: page, _limit: paginate._limit })
            }
          }}
        />
      )
    },
    {
      key: '2',
      label: 'Sản phẩm đang hoạt động',
      children: (
        <MainProduct
          isLoading={isFetching || isLoading}
          products={products}
          paginate={{
            _page: paginate._page,
            _limit: paginate._limit,
            totalDocs: data.totalDocs,
            onChange: (page) => {
              setPaginate({ ...paginate, _page: page, _limit: paginate._limit })
            }
          }}
        />
      )
    },
    {
      key: '3',
      label: 'Sản phẩm không hoạt động',
      children: (
        <MainProduct
          isLoading={isFetching || isLoading}
          products={products}
          paginate={{
            _page: paginate._page,
            _limit: paginate._limit,
            totalDocs: data.totalDocs,
            onChange: (page) => {
              setPaginate({ ...paginate, _page: page, _limit: paginate._limit })
            }
          }}
        />
      )
    },
    {
      key: '4',
      label: 'Sản phẩm đã xoá',
      children: (
        <MainProduct
          isLoading={isFetching || isLoading}
          products={products}
          paginate={{
            _page: paginate._page,
            _limit: paginate._limit,
            totalDocs: data.totalDocs,
            onChange: (page) => {
              setPaginate({ ...paginate, _page: page, _limit: paginate._limit })
            }
          }}
        />
      )
    }
  ]

  return (
    <div className='bg-gray-third py-[30px] px-[30px]'>
      <Navbar
        button={{
          title: 'Thêm sản phẩm',
          size: 'large',
          type: 'primary',
          onClick: () => onOpenModal('add')
        }}
        input={{
          placeholder: 'Search for product',
          onSearch: (value) => setInputValue(value)
        }}
      />

      <div>
        <Tabs
          defaultActiveKey='1'
          items={items}
          onChange={(value) => {
            handleChangeTab({ keyTab: value, paginate, setQuery, navigate })
          }}
        />
      </div>

      {/* form add product */}
      <FomrProduct currentData={currentModal} onClose={onCloseModal} refetch={refetch} />
    </div>
  )
}

export default ProductPage
