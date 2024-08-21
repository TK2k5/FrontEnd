import { Button, Modal } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface DeleteProps {
  button: {
    iconClassName?: string
    className?: string
    title?: string
  }
}

const Delete = ({ button }: DeleteProps) => {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const { iconClassName, className, title } = button

  return (
    <>
      <button
        className={className}
        onClick={() => {
          setOpenModalDelete(true)
          // setId(record._id), setQueryDelete({ is_deleted: !record.is_deleted, status: record.status })
        }}
      >
        <DeleteOutlined height={20} width={20} className={iconClassName} />
        {title}
      </button>

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
                setOpenModalDelete(true)
                // setId(record._id), setQueryDelete({ is_deleted: !record.is_deleted, status: record.status })
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
    </>
  )
}

export default Delete
