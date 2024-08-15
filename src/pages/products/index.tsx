import { GlassesIcon } from '@/components/icons'
import { Input } from 'antd'
import { getProducts } from '@/apis/product.api'
import { useAuth } from '@/contexts/auth-context'
import { useQuery } from '@tanstack/react-query'

const ProductPage = () => {
  const { accessToken } = useAuth()
  const { data, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(accessToken)
  })

  console.log('🚀 ~ ProductPage ~ data:', data)

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
    </div>
  )
}

export default ProductPage
