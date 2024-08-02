/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { TProduct } from '@/types/product.type'
import { useProduct } from '@/contexts/product-contex'

const ProductPage = () => {
  const { products, handleDeleteProduct, handleCreateProduct, handleUpdateProduct } = useProduct()

  const columns = [
    {
      title: 'ID sản phẩm',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: false,
      dataIndex: 'action',
      key: 'action',
      render: (_: undefined, product: TProduct & { key: string }) => {
        return (
          <Space>
            <Button danger onClick={() => handleDeleteProduct(product.id)}>
              <DeleteOutlined />
            </Button>
            <Button onClick={() => handleUpdateProduct(product)}>
              <EditOutlined />
            </Button>
          </Space>
        )
      }
    }
  ]

  const dataSource = products.map((product) => ({
    ...product,
    key: product.id
  }))

  return (
    <div>
      <Button onClick={handleCreateProduct}>Thêm sản phẩm</Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default ProductPage
