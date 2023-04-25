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

  else if (type === chatListTypes.update) {
    const { id, name } = payload

    const clone = structuredClone(state)

    const findIndex = clone.findIndex((value) => value.id === id)

    if (findIndex === -1) return state

    clone[findIndex].name = name

    return clone
  }

  else if (type === chatListTypes.remove) {
    const filter = state.filter((value) => value.id !== payload.id)

    return filter
  }

  return state
}

export default list
