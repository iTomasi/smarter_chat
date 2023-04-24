'use client'
import type { IGptMessage } from 'types/Gpt'
import { createContext } from 'react'

export interface IList {
  id: number
  name: string
}

interface IReactState {
  gptTyping: string
  setGptTyping: (value: string | ((prev: string) => string)) => void
  isLoading: boolean
  setIsLoading: (value: boolean | ((prev: boolean) => boolean)) => void
  isTyping: boolean
  setIsTyping: (value: boolean | ((prev: boolean) => boolean)) => void
}

interface IContext extends IReactState {
  list: IList[]
  messages: IGptMessage[]
  pushMessage: (value: IGptMessage) => void
  createNewChat: () => Promise<void>
}

const Context = createContext<IContext>({
  list: [],
  messages: [],
  pushMessage: () => {},
  createNewChat: async () => {},
  gptTyping: '',
  setGptTyping: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isTyping: false,
  setIsTyping: () => {}
})

export default Context
