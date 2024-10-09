import { BodySendMessage, Message } from '@/types/message.type'
import { useEffect, useState } from 'react'

import Content from './components/content'
import Sidebar from './components/sidebar'
import { getAllMessagers } from '@/apis/message.api'
import { io } from 'socket.io-client'
import { useAuth } from '@/contexts/auth-context'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '@/hooks/useQueryParams'

const Messagers = () => {
  const { roomId } = useQueryParams()
  const { accessToken } = useAuth()
  const socket = io('http://localhost:8080')

  const [messagers, setMessagers] = useState<Message[]>([])

  // get all messagers
  const { data: dataMessagers } = useQuery({
    queryKey: ['messagers'],
    queryFn: () => getAllMessagers(roomId, accessToken),
    enabled: !!roomId
  })

  useEffect(() => {
    if (dataMessagers) {
      setMessagers(dataMessagers?.docs)
    }
  }, [dataMessagers])

  // tạo 1 hàm join room
  const handleJoinRoom = (roomId: string) => {
    socket.emit('join-room', roomId)
  }

  // tạo 1 hàm send message
  const handleSendMessage = (data: BodySendMessage) => {
    socket.emit('send-message', data)
  }

  // tạo 1 hàm nhận message
  useEffect(() => {
    socket.on('received-message', (data: Message) => {
      setMessagers((prev) => [...prev, data])
    })
  }, [])

  return (
    <div className='grid h-full grid-cols-4'>
      <Sidebar onJoinRoom={handleJoinRoom} />

      <Content onSendMessage={handleSendMessage} messagers={messagers} />
    </div>
  )
}

export default Messagers
