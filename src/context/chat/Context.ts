'use client'
import type { IGptMessage } from 'types/Gpt'
import { createContext } from 'react'

interface IReactState {
  gptTyping: string
  setGptTyping: (value: string | ((prev: string) => string)) => void
  isLoading: boolean
  setIsLoading: (value: boolean | ((prev: boolean) => boolean)) => void
  isTyping: boolean
  setIsTyping: (value: boolean | ((prev: boolean) => boolean)) => void
}

interface IContext extends IReactState {
  messages: IGptMessage[]
  pushMessage: (value: IGptMessage) => void
}

const Context = createContext<IContext>({
  messages: [],
  pushMessage: () => {},
  gptTyping: '',
  setGptTyping: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isTyping: false,
  setIsTyping: () => {}
})

export default Context
