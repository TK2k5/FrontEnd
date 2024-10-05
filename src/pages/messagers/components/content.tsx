/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Empty, message } from 'antd'
import { createMessage, getAllMessagers } from '@/apis/message.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { BodySendMessage } from '@/types/message.type'
import QuillEditor from '@/components/quill-editor'
import { cn } from '@/utils/cn'
import dayjs from 'dayjs'
import { getMeInfo } from '@/apis/profile.api'
import { useAuth } from '@/contexts/auth-context'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useState } from 'react'

const Content = () => {
  const { accessToken } = useAuth()
  const { roomId } = useQueryParams()
  const queryClient = useQueryClient()
  // get me
  const { data: dataInfo } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMeInfo(accessToken)
  })
  const userInfo = dataInfo?.data
  // get all messagers
  const { data: dataMessagers } = useQuery({
    queryKey: ['messagers'],
    queryFn: () => getAllMessagers(roomId, accessToken),
    enabled: !!roomId
  })
  const messagers = dataMessagers?.docs
  // crate question
  const createMesage = useMutation({
    mutationKey: ['create-message'],
    mutationFn: (body: BodySendMessage) => createMessage(body, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messagers'] })
    },
    onError: () => {
      message.error('Vui lòng thử lại sau!')
    }
  })
  // value
  const [valueInput, setValueInput] = useState<string>('')
  const handleSendMessage = () => {
    createMesage.mutate({
      content: valueInput,
      sender: userInfo?._id,
      room: roomId
    })
  }
  return (
    <div className='flex flex-col w-full h-full col-span-3 p-4 overflow-y-scroll bg-white'>
      {(!messagers || messagers.length === 0) && <Empty />}
      {messagers &&
        messagers.length > 0 &&
        messagers.map((chat, index) => {
          return (
            <div className={cn('flex items-center gap-3 p-3', { 'justify-end': false })} key={`${chat._id}`}>
              <img
                src={'https://picsum.photos/536/354'}
                alt={chat.sender.email}
                className={cn('h-[40px] w-[40px] rounded-full', { hidden: false })}
              />
              <div
                className={cn('flex flex-col gap-1', { 'items-end': false })}
                title={dayjs().format('DD/MM/YYYY HH:mm:ss')}
              >
                <p className='text-xs'>{dayjs(chat.createdAt).format('HH:mm')}</p>
                <div
                  className={cn(
                    'p-2 bg-gray-100 rounded-md',
                    { 'w-2/3': chat.content.length > 150 },
                    { 'bg-blue-100': false }
                  )}
                >
                  <p
                    className='font-medium'
                    dangerouslySetInnerHTML={{
                      __html: chat.content
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      <div className='mt-auto'>
        <QuillEditor value={valueInput} onChange={setValueInput} />
        <Button onClick={() => handleSendMessage()}>Send</Button>
      </div>
    </div>
  )
}
export default Content
