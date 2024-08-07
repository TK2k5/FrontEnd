import { Button, Form, Input } from 'antd'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col justify-center w-full h-full gap-2.5 md:w-2/3 lg:w-full'>
      <div className='h-[60px] w-[60px] bg-[#EEF2FF] text-[#4F46E5] font-semibold rounded-xl flex items-center justify-center text-[28px]'>
        G
      </div>

      <div className='mt-[45px]'>
        <h1 className='font-semibold text-[32px] text-black'>Masuk ke akun kamu</h1>
        <p className='text-base font-normal text-[#4B5563]'>
          Belajar gratis di Namanyajugabelajar.io, dan memulai karir yang kamu cita-citata sejak dalam embrio!
        </p>
      </div>

      <Form layout='vertical' className='mt-[35px]'>
        <Form.Item
          name={'email'}
          label={<span className='font-semibold'>{t('form.email')}</span>}
          rules={[
            { required: true, message: t('validate.required') },
            {
              type: 'email',
              message: t('validate.email')
            }
          ]}
        >
          <Input placeholder='Email' className='h-[48px] w-full' />
        </Form.Item>

        <Form.Item
          name={'password'}
          label={
            <div className='flex items-center justify-between flex-1'>
              <span className='font-semibold'>{t('form.password')}</span>
              <Link to={'/forgot-password'} className='text-[#4F46E5] font-semibold hover:text-[#4F46E5]'>
                {t('form.forgotPassword')}
              </Link>
            </div>
          }
          rules={[{ required: true, message: t('validate.required') }]}
        >
          <Input.Password placeholder='Password' className='h-[48px] w-full' />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          className='h-[48px] mt-5 w-full bg-[#4F46E5] hover:!bg-[#4F46E5] text-base'
        >
          {t('form.login')}
        </Button>
      </Form>
    </div>
  )
}

export default LoginPage
