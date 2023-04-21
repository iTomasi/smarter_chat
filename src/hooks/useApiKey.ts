import { useContext } from 'react'
import { ApiKeyContext } from 'context/apiKey'

export const useApiKey = () => {
  const ctx = useContext(ApiKeyContext)
  
  return ctx
}
