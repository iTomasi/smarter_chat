'use client'
import { useContext } from 'react'
import { ChatContext } from 'context/chat'

export const useChat = () => {
  const ctx = useContext(ChatContext)

  return ctx
}
