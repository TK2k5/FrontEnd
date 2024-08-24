import ColumnsTable from './table/columns-table'
import DeleteTable from '@/components/delete-table'
import { TProduct } from '@/types/product.type'
import { Table } from 'antd'
import { useState } from 'react'

interface MainProductProps {
  // columns: TableColumnsType<TProduct>
  products: TProduct[]
  paginate: {
    _page: number
    _limit: number
    totalDocs: number
    onChange: (page: number) => void
  }
}

const MainProduct = ({ products, paginate }: MainProductProps) => {
  const { _limit, _page, totalDocs, onChange } = paginate

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [rowSelections, setRowSelections] = useState<TProduct[]>([])
  const [product, setProduct] = useState<TProduct>()

  const handleDelete = (values: TProduct[] | TProduct) => {
    if (Array.isArray(values)) {
      console.log('Delete multiple', values)
    } else {
      console.log('Delete single', values)
    }
  }

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: TProduct[]) => {
      setRowSelections(selectedRows)
    }
  }

  const columns = ColumnsTable({ onDelete: handleDelete, setOpenModalDelete, onDetail: setProduct, rowSelections })

  return (
    <div className=''>
      <Table
        rowKey={(record) => record._id}
        dataSource={products}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        columns={columns}
        pagination={{
          current: _page,
          pageSize: _limit,
          total: totalDocs,
          onChange: (page) => onChange(page),
          showTotal(total, range) {
            return (
              <div className='flex items-center justify-between w-full mr-auto text-black-second'>
                Showing {range[0]}-{range[1]} of {total}
              </div>
            )
          }
        }}
      />

      <DeleteTable
        handleDelete={handleDelete}
        openModalDelete={openModalDelete}
        rowSelections={rowSelections}
        setOpenModalDelete={setOpenModalDelete}
        selectionSingle={product}
        text={{
          title: 'Xoá sản phẩm',
          content: 'Bạn có chắc chắn muốn xoá sản phẩm này không? Hành động này không thể hoàn tác?'
        }}
      />
    </div>
  )
}

export default MainProduct
