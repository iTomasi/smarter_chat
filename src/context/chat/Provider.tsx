'use client'
import type { ReactNode } from 'react'
import type { IGptMessage } from 'types/Gpt'
import { useState, useReducer, useEffect } from 'react'
import Context from './Context'
import { messageReducer, listReducer } from './reducers'
import { gptMessageTypes } from 'context/types'
import { listInsert, listGetAll } from 'services/indexedDB/list'
import { toast } from 'sonner'
import { chatListTypes } from 'context/types'
import { useSearchParams } from 'next/navigation'

interface Props {
  children: ReactNode
}

export default function Provider ({
  children
}: Props) {
  const searchParams = useSearchParams()
  const [messages, dispatchMessages] = useReducer(messageReducer, [])
  const [list, dispatchList] = useReducer(listReducer, [])
  const [id, setId] = useState<number>(-1)
  const [gptTyping, setGptTyping] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const request = indexedDB.open('Chat')

    const handleOnSuccess = async () => {
      const { error, data } = await listGetAll()

      if (error) {
        toast.error('IndexedDB Error')
        console.log(error)
        return
      }

      dispatchList({
        type: chatListTypes.change,
        payload: data
      })
    }

    const handleOnError = () => {
      toast.error('IndexedDB Error')
      return
    }

    request.addEventListener('upgradeneeded', (e: any) => {
      const db = e.target.result

      db.createObjectStore('List', {
        autoIncrement: true
      })

      db.close()

      listInsert({ name: 'LoLL' })
    })

    request.addEventListener('success', handleOnSuccess)
    request.addEventListener('error', handleOnError)

    return () => {
      request.removeEventListener('success', handleOnSuccess)
      request.removeEventListener('error', handleOnError)
    }
  }, [])

  useEffect(() => {
    if (list.length === 0) return

    const chatId = searchParams.get('chat_id')

    const firstListId = list[0].id

    if (chatId === null) {
      setId(firstListId)
      return
    }

    const numberChatId = Number(chatId)

    if (isNaN(numberChatId)) {
      setId(firstListId)
      return
    }

    const some = list.some((value) => value.id === numberChatId)

    setId(some ? numberChatId : firstListId)
  }, [list, searchParams])

  const pushMessage = (payload: IGptMessage) => {
    dispatchMessages({
      type: gptMessageTypes.push,
      payload
    })
  }

  const createNewChat = async () => {
    const { error, data } = await listInsert({ name: 'New Chat' })

    if (error) {
      toast.error('IndexedDB Error')
      console.log(error)
      return
    }

    dispatchList({
      type: chatListTypes.push,
      payload: data
    })
  }

  return (
    <Context.Provider value={{
      id,
      list,
      createNewChat,
      messages,
      pushMessage,
      gptTyping,
      setGptTyping,
      isTyping,
      setIsTyping,
      isLoading,
      setIsLoading
    }}>
      {children}
    </Context.Provider>
  )
}
