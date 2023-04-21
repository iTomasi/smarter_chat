'use client'
import type { ReactNode } from 'react'
import Context, { initialValueApiKeys, type KeyOfApiKey } from './Context'
import { useReducer, useEffect } from 'react'
import reducer from './reducer'
import { apiKeyTypes } from 'context/types'

interface Props {
  children: ReactNode
}

export default function Provider ({
  children
}: Props) {
  const [state, dispatch] = useReducer(reducer, initialValueApiKeys)

  useEffect(() => {
    const LSOpenAiKey = localStorage.getItem('iw_openai')

    if (typeof LSOpenAiKey !== 'string') return

    dispatch({
      type: apiKeyTypes.set,
      payload: {
        key: 'openai',
        value: LSOpenAiKey
      }
    })
  }, [])

  const setApiKey = (key: KeyOfApiKey, value: string) => {
    dispatch({
      type: apiKeyTypes.set,
      payload: {
        key,
        value
      }
    })
  }

  return (
    <Context.Provider value={{
      ...state,
      handlers: {
        setApiKey
      }
    }}>
      {children}
    </Context.Provider>
  )
}
