import type { IApiKeys } from './Context'
import { apiKeyTypes } from 'context/types'

const reducer = (state: IApiKeys, action: any): IApiKeys => {
  const { type, payload } = action

  if (type === apiKeyTypes.set) {
    return {
      ...state,
      [payload.key]: payload.value
    }
  }

  return state
}

export default reducer
