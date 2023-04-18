import type { IGptMessage } from 'types/Gpt'
import { API_OPENAI_URL } from 'config/consts'

interface ISecondArg {
  messages: IGptMessage[]
  onChunk: (value: string) => void
}

const DATA_RES_START = 'data:'
const DONE = '[DONE]'

const chatGPT = async (
  apiKey: string,
  {
    messages,
    onChunk
  }: ISecondArg
) => {
  try {
    const fetching = await fetch(
      API_OPENAI_URL,
      {
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          stream: true
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    )

    if (!fetching.ok) return { error: 'Something went wrong' }

    const reader = fetching.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()

      if (done) return { success: true }

      const chunk = decoder.decode(value).trim()
      const split = chunk.split('\n')

      split.forEach((value) => {
        if (!value || !value.startsWith(DATA_RES_START)) return

        const replace = value.replace(DATA_RES_START, '').trim()

        if (replace === DONE) return

        const parse = JSON.parse(replace)

        const content = parse.choices[0].delta.content

        if (typeof content !== 'string') return
      
        onChunk(content)
      })
    }
  } catch (e) {
    console.log(e)
    console.log('chatGPT() Error')
  }
}

export default chatGPT
