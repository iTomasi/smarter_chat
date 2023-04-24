'use client'
import type { ReactNode } from 'react'
import type { IGptMessage } from 'types/Gpt'
import { useState, useReducer, useEffect } from 'react'
import Context from './Context'
import { messageReducer } from './reducers'
import { gptMessageTypes } from 'context/types'
import { listInsert } from 'services/indexedDB/list'

interface Props {
  children: ReactNode
}

export default function Provider ({
  children
}: Props) {
  const [messages, dispatchMessages] = useReducer(messageReducer, [])
  const [gptTyping, setGptTyping] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const request = indexedDB.open('Chat')

    request.addEventListener('upgradeneeded', (e: any) => {
      const db = e.target.result

      db.createObjectStore('List', {
        autoIncrement: true
      })

      db.close()

      listInsert({ name: 'LoLL' })
    })
  }, [])

  const pushMessage = (payload: IGptMessage) => {
    dispatchMessages({
      type: gptMessageTypes.push,
      payload
    })
  }

  return (
    <Context.Provider value={{
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