import type { IGptMessage } from 'types/Gpt'
import { gptMessageTypes } from 'context/types'

const message = (state: IGptMessage[], action: any): IGptMessage[] => {
  const { type, payload } = action

  if (type === gptMessageTypes.push) return [...state, payload]

  return state
}

export default message
