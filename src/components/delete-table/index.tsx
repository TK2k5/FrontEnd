import { Button, Modal } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { useMemo } from 'react'
import { cn } from '@/utils/cn'
import { ArrowRestoreIcon } from '../icons'

interface DeleteTableProps<T> {
  rowSelections: T[]
  setOpenModalDelete: (value: boolean) => void
  openModalDelete: boolean
  handleDelete: (values: T[] | T, isdeleted?: boolean) => void
  selectionSingle?: T
  text: {
    title: string
    content: string
  }
  type?: 'delete' | 'restore'
}

const DeleteTable = <T,>({
  handleDelete,
  openModalDelete,
  rowSelections,
  selectionSingle,
  setOpenModalDelete,
  text,
  type
}: DeleteTableProps<T>) => {
  const checkStatus = useMemo(() => rowSelections.every((item) => item.is_delete), [rowSelections])
  return (
    <>
      {rowSelections.length > 0 && (
        <div className={cn('flex items-center justify-between')}>
          <button
            className='flex items-center gap-2 text-red-500'
            onClick={() => {
              setOpenModalDelete(true)
            }}
          >
            {!checkStatus && type === 'delete' ? (
              <>
                <DeleteOutlined />
                Delete
              </>
            ) : (
              <>
                <ArrowRestoreIcon />
                Restore
              </>
            )}
          </button>

          <span className=''>{rowSelections.length} Selected</span>
        </div>
      )}

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
                setOpenModalDelete(false)
                handleDelete(
                  selectionSingle && rowSelections.length === 0 ? selectionSingle : rowSelections,
                  checkStatus && type === 'restore' ? false : true
                )              }}
            >
              {text.title}
            </Button>
          </div>
        }
      >
        <p className='text-center text-gray-500'>{text.content}</p>
      </Modal>
    </>
  )
}

export default DeleteTable
