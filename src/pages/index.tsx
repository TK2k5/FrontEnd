import { Button } from 'antd'
import useCounter from '@/contexts/counter-context'

const HomePage = () => {
  const { counter, handleIncrement, handleDecrement } = useCounter()

  return (
    <div>
      HomePage
      <p className='px-10'>Counter: {counter}</p>
      <Button onClick={() => handleIncrement()}>Increment</Button>
      <Button onClick={() => handleDecrement()}>Decrement</Button>
    </div>
  )
}

export default HomePage
