/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Upload,
  UploadProps,
  message
} from 'antd'
import { CloseOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons'
import {
  QueryClient,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import { TModal, TResponse } from '@/types/common.type'
import { TProduct, TProductForm } from '@/types/product.type'

import { ArrowDownSmallIcon } from '@/components/icons'
import QuillEditor from '@/components/quill-editor'
import { addProduct } from '@/apis/product.api'
import { getBrands } from '@/apis/brand.api'
import { getCategories } from '@/apis/category.api'
import { uploadImage } from '@/apis/upload-image.api'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'

interface IFormProductProps {
  currentData: TModal<TProduct>
  onClose: () => void
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TResponse<TProduct>, Error>>
}

interface Image {
  url: string
  public_id: string
}

const { Dragger } = Upload

const FormProduct = ({ currentData, onClose, refetch }: IFormProductProps) => {
  const { accessToken } = useAuth()

  const [form] = Form.useForm<TProductForm>()
  const queryClient = new QueryClient()

  const [paginate, setPaginate] = useState({
    _page: 1,
    _limit: 10,
    totalPages: 1
  })
  const [query, setQuery] = useState<string>(`?_page=${paginate._page}&_limit=${paginate._limit}`)

  const createProductMutation = useMutation({
    mutationKey: ['createProduct'],
    mutationFn: (product: TProductForm) => addProduct(product, accessToken),
    onSuccess: () => {
      message.success('Thêm sản phẩm thành công')
      onClose()
      form.resetFields()
      setImage({ url: '', public_id: '' })
      setValue('')
      refetch()
      queryClient.invalidateQueries({ queryKey: ['products', query] })
    },
    onError: () => {
      message.error('Thêm sản phẩm thất bại')
    }
  })

  // lưu trữ văn bản từ text editor
  const [value, setValue] = useState<string>('')
  const [image, setImage] = useState<Image>({ url: '', public_id: '' })

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    listType: 'picture',
    accept: 'image/*',
    async customRequest({ file, onSuccess, onError }) {
      const formData = new FormData()
      formData.append('images', file)

      const response = await uploadImage(formData, accessToken)
      const urlInfo: Image = response.data.urls[0]

      if (urlInfo) {
        setImage({
          url: urlInfo.url,
          public_id: urlInfo.public_id
        })
        onSuccess && onSuccess(urlInfo)
      } else {
        onError &&
          onError({
            name: 'error',
            message: 'Lỗi khi upload ảnh'
          })
      }
    },
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

  // brand
  const { data: dataBrand, isLoading: isLoadingBrand } = useQuery({
    queryKey: ['brands'],
    queryFn: () => getBrands(accessToken)
  })
  const brands = dataBrand?.data

  const onSubmit = (data: TProductForm) => {
    if (!data.sizes) {
      message.error('Vui lòng thêm size sản phẩm')
      return
    }

    const dataProduct: TProductForm = {
      ...data,
      sale: data.sale || 0,
      status: data.status ? 'active' : 'inactive',
      images: [image]
    }

    createProductMutation.mutate(dataProduct)
  }
  return (
    <Drawer
      title='Thêm sản phẩm'
      onClose={onClose}
      open={currentData.visiable}
      width={800}
      extra={
        <Space>
          <Button size='large' onClick={onClose}>
            Đóng sản phẩm
          </Button>
          <Button
            size='large'
            type='primary'
            onClick={() => form.submit()}
            disabled={createProductMutation.isLoading}
            loading={createProductMutation.isLoading}
          >
            Thêm sản phẩm
          </Button>
        </Space>
      }
    >
      <Form layout='vertical' form={form} onFinish={onSubmit}>
        <Row gutter={40}>
          <Col span={12}>
            <Form.Item
              name={'nameProduct'}
              label='Tên sản phẩm'
              rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc' }]}
            >
              <Input size='large' placeholder='Tên sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'price'}
              label='Giá sản phẩm'
              rules={[{ required: true, message: 'Giá sản phẩm là bắt buộc' }]}
            >
              <InputNumber className='w-full' size='large' placeholder='Giá sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'brand'}
              label='Thương hiệu sản phẩm'
              rules={[{ required: true, message: 'Thương hiệu sản phẩm là bắt buộc' }]}
            >
              <Select
                loading={isLoadingBrand}
                size='large'
                suffixIcon={<ArrowDownSmallIcon />}
                placeholder='Thương hiệu sản phẩm'
                options={brands?.map((brand) => ({
                  value: brand._id,
                  label: brand.nameBrand
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'category'}
              label='Danh mục sản phẩm'
              rules={[{ required: true, message: 'Danh mục sản phẩm là bắt buộc' }]}
            >
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
            <Form.Item
              name={'sale'}
              label='Giá khuyến mại sản phẩm'
              rules={[
                // giá khuyến mại luôn nhỏ hơn giá sản phẩm
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const price = getFieldValue('price')
                    if (!value || value < price) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Giá khuyến mại phải nhỏ hơn giá sản phẩm'))
                  }
                })
              ]}
            >
              <InputNumber className='w-full' size='large' placeholder='Giá khuyến mại sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'status'} label='Trạng thái sản phẩm'>
              <Switch />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label='Size sản phẩm' className='!mb-0' rules={[{ required: true, message: 'Size sản phẩm' }]}>
              <Form.List name='sizes'>
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
                          name={[name, 'quantity']}
                          rules={[{ required: true, message: 'Số lượng' }]}
                        >
                          <InputNumber className='w-full' size='large' placeholder='Số lượng' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'color']}
                          rules={[{ required: true, message: 'Màu sản phẩm' }]}
                        >
                          <Input size='large' placeholder='Màu sản phẩm' />
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
              {/* <Input.TextArea size='large' placeholder='Mô tả sản phẩm' /> */}
              <QuillEditor value={value} onChange={(value) => setValue(value)} />
            </Form.Item>
          </Col>

          {/* image */}
          <Col span={24}>
            <Form.Item
              name={'images'}
              label='Hình ảnh sản phẩm'
              rules={[{ required: true, message: 'Hình ảnh sản phẩm là bắt buộc' }]}
            >
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

export default FormProduct
