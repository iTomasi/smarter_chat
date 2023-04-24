'use client'
import type { ReactNode } from 'react'
import type { IGptMessage } from 'types/Gpt'
import { useState, useReducer, useEffect } from 'react'
import Context from './Context'
import { messageReducer, listReducer } from './reducers'
import { gptMessageTypes } from 'context/types'
import { listGetAll, listInsert } from 'services/indexed/chat'
import { chatListTypes } from 'context/types'
import { toast } from 'sonner'

interface Props {
  children: ReactNode
}

export default function Provider ({
  children
}: Props) {
  const [messages, dispatchMessages] = useReducer(messageReducer, [])
  const [list, dispatchList] = useReducer(listReducer, [])
  const [db, setDb] = useState<any>(null)
  const [gptTyping, setGptTyping] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const request = indexedDB.open('Chat', 1)

    const handleOnSuccess = async (e: any) => {
      const db = e.target.result

      setDb(db)

      const { error, data }: any = await listGetAll(db)

      if (error) {
        console.log(error)
        return
      }

      dispatchList({
        type: chatListTypes.change,
        payload: data
      })
    }

    const handleOnUpgradeNeeded = (e: any) => {
      const db = e.target.result

      db.createObjectStore('List', {
        autoIncrement: true
      })

      db.createObjectStore('Message', {
        autoIncrement: true
      })
    }

    const handleOnError = () => {
      console.log('indexedDB error')
    }

    request.addEventListener('success', handleOnSuccess)
    request.addEventListener('upgradeneeded', handleOnUpgradeNeeded)
    request.addEventListener('error', handleOnError)

    return () => {
      request.removeEventListener('success', handleOnSuccess)
      request.removeEventListener('upgradeneeded', handleOnUpgradeNeeded)
      request.removeEventListener('error', handleOnError)
    }
  }, [])

  const pushMessage = (payload: IGptMessage) => {
    dispatchMessages({
      type: gptMessageTypes.push,
      payload
    })
  }

  const createNewChat = async () => {
    if (db === null) {
      toast.error('Indexed db is not initialized')
      return
    }

    const { error, data }: any = await listInsert(db, { name: 'New chat' })

    if (error) {
      console.log(error)
      toast.error('ERROR')
      return
    }

    dispatchList({
      type: chatListTypes.push,
      payload: data
    })
  }

  return (
    <Context.Provider value={{
      list,
      messages,
      pushMessage,
      createNewChat,
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