import type { IList } from 'context/chat/Context'
import { chatListTypes } from 'context/types'

const list = (state: IList[], action: any): IList[] => {
  const { type, payload } = action

  if (type === chatListTypes.change) {
    return payload
  }

  else if (type === chatListTypes.push) {
    return [...state, payload]
  }

  return state
}

export default list
