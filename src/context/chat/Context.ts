'use client'
import type { IGptMessage } from 'types/Gpt'
import { createContext } from 'react'

export interface IList {
  id: number
  name: string
}

interface IReactState {
  id: number
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
  updateList: (id: number, payload: { name: string }) => Promise<boolean>
  removeList: (id: number) => Promise<string | null>
}

const Context = createContext<IContext>({
  list: [],
  messages: [],
  pushMessage: () => {},
  id: -1,
  gptTyping: '',
  setGptTyping: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isTyping: false,
  setIsTyping: () => {},
  createNewChat: async () => {},
  updateList: async () => false,
  removeList: async () => null
})

export default Context
