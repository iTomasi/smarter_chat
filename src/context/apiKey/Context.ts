'use client'
import { createContext } from 'react'

export interface IApiKeys {
  openai: string | null
}

export type KeyOfApiKey = keyof IApiKeys

interface IHandlers {
  setApiKey: (key: keyof IApiKeys, value: string) => void
}

interface IContext extends IApiKeys {
  handlers: IHandlers
}

export const initialValueApiKeys: IApiKeys = {
  openai: null
}

const Context = createContext<IContext>({
  ...initialValueApiKeys,
  handlers: {
    setApiKey: () => {}
  }
})

export default Context
