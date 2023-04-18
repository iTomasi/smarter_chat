'use client'
import Message from 'components/Message'
import { useChat } from 'hooks'

export default function Chat () {
  const { messages, isLoading, isTyping, gptTyping } = useChat()

  return (
    <div className="flex flex-col gap-8">
      {
        messages.map(({ role, content }, index) => (
          <Message
            key={index}
            from={role === 'assistant' ? 'gpt' : 'me'}
            content={content}
          />
        ))
      }

      {
        (isLoading || isTyping) && (
          <Message
            from="gpt"
            content={isLoading ? '...' : gptTyping}
          />
        )
      }
    </div>
  )
}