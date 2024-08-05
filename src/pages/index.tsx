import { Button } from 'antd'
import useCounter from '@/contexts/counter-context'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { counter, handleIncrement, handleDecrement } = useCounter()
  const { t } = useTranslation()

  return (
    <div>
      HomePage
      <p>{t('title')}</p>
      <p className='px-10'>Counter: {counter}</p>
      <Button onClick={() => handleIncrement()}>Increment</Button>
      <Button onClick={() => handleDecrement()}>Decrement</Button>
    </div>
  )
}

export default HomePage
