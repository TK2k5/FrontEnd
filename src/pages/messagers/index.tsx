import { cn } from '@/utils/cn'
import dayjs from 'dayjs'
import { useId } from 'react'

const Messagers = () => {
  const random = useId()
  const chats = [
    {
      id: useId(),
      user: {
        id: useId(),
        name: 'Dang Van A',
        avatar: 'https://picsum.photos/536/354'
      },
      content: 'Cậu ăn cơm chưa!',
      createAt: '12/12/2022'
    },
    {
      id: useId(),
      user: {
        id: useId(),
        name: 'Dang Van B',
        avatar: 'https://picsum.photos/536/354'
      },
      content: 'Cậu ăn cơm chưa!',
      createAt: dayjs().format('DD/MM/YYYY')
    },
    {
      id: useId(),
      user: {
        id: useId(),
        name: 'Dang Van A',
        avatar: 'https://picsum.photos/536/354'
      },
      content:
        'Cậu ăn cơm chưa! Group 3 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus ab mollitia voluptatibus cupiditate ut itaque, omnis deleniti magni commodi temporibus hic facere esse cumque odio dolor odit numquam adipisci error. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident iste perferendis a voluptate minima vitae. Est nesciunt reprehenderit ipsa, impedit repellat blanditiis veniam eveniet doloribus placeat consequatur expedita culpa iure!',
      createAt: dayjs().format('DD/MM/YYYY')
    },
    {
      id: useId(),
      user: {
        id: useId(),
        name: 'Dang Van B',
        avatar: 'https://picsum.photos/536/354'
      },
      content:
        'Cậu ăn cơm chưa! Group 3 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus ab mollitia voluptatibus cupiditate ut itaque, omnis deleniti magni commodi temporibus hic facere esse cumque odio dolor odit numquam adipisci error. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident iste perferendis a voluptate minima vitae. Est nesciunt reprehenderit ipsa, impedit repellat blanditiis veniam eveniet doloribus placeat consequatur expedita culpa iure!',
      createAt: dayjs().format('DD/MM/YYYY')
    },
    {
      id: useId(),
      user: {
        id: useId(),
        name: 'Dang Van A',
        avatar: 'https://picsum.photos/536/354'
      },
      content: 'Cậu ăn cơm chưa!',
      createAt: dayjs().format('DD/MM/YYYY')
    }
  ]
  return (
    <div className='grid h-full grid-cols-4'>
      <div className='h-full p-4 overflow-y-scroll'>
        {Array.from({ length: 20 }).map((_, index) => {
          return (
            <div
              className='flex items-center gap-3 p-3 border-b rounded cursor-pointer hover:bg-gray-200'
              key={`${random}${index}`}
            >
              <img src='https://picsum.photos/536/354' alt='logo' className='h-[40px] w-[40px] rounded-full' />
              <p className='font-medium'>Group {index + 1}</p>
            </div>
          )
        })}
      </div>
      <div className='h-full col-span-3 p-4 overflow-y-scroll bg-white'>
        {chats.map((chat, index) => {
          const isUserLogin = index % 2 === 0
          return (
            <div
              className={cn('flex items-center gap-3 p-3', { 'justify-end': isUserLogin })}
              key={`${random}${index}`}
            >
              <img
                src={chat.user.avatar}
                alt={chat.user.name}
                className={cn('h-[40px] w-[40px] rounded-full', { hidden: isUserLogin })}
              />
              <div
                className={cn('flex flex-col gap-1', { 'items-end': isUserLogin })}
                title={dayjs().format('DD/MM/YYYY HH:mm:ss')}
              >
                <p className='text-xs'>{chat.createAt}</p>
                <div
                  className={cn(
                    'p-2 bg-gray-100 rounded-md',
                    { 'w-2/3': chat.content.length > 150 },
                    { 'bg-blue-100': isUserLogin }
                  )}
                >
                  <p className='font-medium'>{chat.content}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Messagers
