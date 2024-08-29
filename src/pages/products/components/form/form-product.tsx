import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload, UploadProps, message } from 'antd'
import { CloseOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons'

import { ArrowDownSmallIcon } from '@/components/icons'
import { getCategories } from '@/apis/category.api'
import { useAuth } from '@/contexts/auth-context'
import { useQuery } from '@tanstack/react-query'

interface IFormProductProps {
  open: boolean
  onClose: () => void
}

const { Dragger } = Upload

const FomrProduct = ({ open, onClose }: IFormProductProps) => {
  const { accessToken } = useAuth()

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(accessToken)
  })
  const categories = data?.data
  console.log('🚀 ~ FomrProduct ~ categories:', categories)

  return (
    <Drawer
      title='Thêm sản phẩm'
      onClose={onClose}
      open={open}
      width={800}
      extra={
        <Space>
          <Button size='large' onClick={onClose}>
            Đóng sản phẩm
          </Button>
          <Button size='large' onClick={onClose} type='primary'>
            Thêm sản phẩm
          </Button>
        </Space>
      }
    >
      <Form layout='vertical'>
        <Row gutter={40}>
          <Col span={12}>
            <Form.Item name={'nameProduct'} label='Tên sản phẩm'>
              <Input size='large' placeholder='Tên sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'price'} label='Giá sản phẩm'>
              <Input size='large' placeholder='Giá sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'brand'} label='Thương hiệu sản phẩm'>
              <Input size='large' placeholder='Thương hiệu sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'category'} label='Danh mục sản phẩm'>
              <Select
                loading={isLoading}
                size='large'
                suffixIcon={<ArrowDownSmallIcon />}
                placeholder='Danh mục sản phẩm'
                options={categories?.map((category) => ({
                  value: category._id,
                  label: category.nameCategory
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'status'} label='Trạng thái sản phẩm'>
              <Input size='large' placeholder='Trạng thái sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'sale'} label='Giá khuyến mại sản phẩm'>
              <Input size='large' placeholder='Giá khuyến mại sản phẩm' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label='Size sản phẩm' name='sizes' className='!mb-0'>
              <Form.List name='users'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex' }} align='baseline'>
                        <Form.Item
                          {...restField}
                          name={[name, 'size']}
                          rules={[{ required: true, message: 'Size sản phẩm' }]}
                        >
                          <Input size='large' placeholder='Size sản phẩm' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'last']}
                          rules={[{ required: true, message: 'Số lượng' }]}
                        >
                          <Input size='large' placeholder='Số lượng' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'last']}
                          rules={[{ required: true, message: 'Màu sản phẩm' }]}
                        >
                          <Input size='large' placeholder='Số lượng' />
                        </Form.Item>
                        <CloseOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type='dashed' size='large' onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>

          {/* desc */}
          <Col span={24}>
            <Form.Item name={'desc'} label='Mô tả sản phẩm'>
              <Input.TextArea size='large' placeholder='Mô tả sản phẩm' />
            </Form.Item>
          </Col>

          {/* image */}
          <Col span={24}>
            <Form.Item name={'images'} label='Hình ảnh sản phẩm'>
              <Dragger {...props}>
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>Click hoặc kéo thả hình ảnh</p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default FomrProduct
