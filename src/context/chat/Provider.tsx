'use client'
import type { ReactNode } from 'react'
import type { IGptMessage } from 'types/Gpt'
import { useState, useReducer, useEffect } from 'react'
import Context from './Context'
import { messageReducer, listReducer } from './reducers'
import { gptMessageTypes } from 'context/types'
import { listInsert, listGetAll, listUpdate, listRemove } from 'services/indexedDB/list'
import { toast } from 'sonner'
import { chatListTypes } from 'context/types'
import { useSearchParams } from 'next/navigation'
import { messageInsert, messageGetByListId } from 'services/indexedDB/message'

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
    const request = indexedDB.open('Chat', 3)

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
      toast.error('Init IndexedDB Error')
      return
    }

    request.addEventListener('upgradeneeded', (e: any) => {
      const db = e.target.result

      try { request.transaction.objectStore('List') }
      catch { 
        db.createObjectStore('List', { autoIncrement: true })
        listInsert({ name: 'New Chat' })
      }

      try { request.transaction.objectStore('Message') }
      catch { db.createObjectStore('Message', { autoIncrement: true }) }
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

  useEffect(() => {
    if (id === -1) return

    messageGetByListId(id)
      .then(({ error, data }) => {
        if (error) {
          console.log(error)
          toast.error('IndexedDB Error')
          return
        }

        dispatchMessages({
          type: gptMessageTypes.change,
          payload: data
        })
      })
  }, [id])

  const pushMessage = (payload: IGptMessage) => {
    dispatchMessages({
      type: gptMessageTypes.push,
      payload
    })

    messageInsert({
      list_id: id,
      ...payload
    })
      .then((data) => {
        console.log(data)
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

  const updateList = async (theId: number, payload: { name: string }) => {
    const updated = await listUpdate(theId, payload)
    
    if (!updated) return false

    dispatchList({
      type: chatListTypes.update,
      payload: {
        id: theId,
        ...payload
      }
    })

    return true
  }

  const removeList = async (id: number) => {
    if (list.length <= 1) return 'Can not remove'

    const removed = await listRemove(id)

    if (!removed) {
      toast.error('IndexedDB error')
      return
    }

    dispatchList({
      type: chatListTypes.remove,
      payload: {
        id
      }
    })

    dispatchMessages({
      type: gptMessageTypes.change,
      payload: []
    })

    const find = list.find((value) => value.id !== id)

    if (!find) return 'Wtf?'

    setId(find.id)

    return null
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
      setIsLoading,
      updateList,
      removeList
    }}>
      {children}
    </Context.Provider>
  )
}
