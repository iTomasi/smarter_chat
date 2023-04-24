'use client'
import type { ReactNode } from 'react'
import type { IGptMessage } from 'types/Gpt'
import { useState, useReducer } from 'react'
import Context from './Context'
import { messageReducer } from './reducers'
import { gptMessageTypes } from 'context/types'

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