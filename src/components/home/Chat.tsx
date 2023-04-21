'use client'
import { useEffect, useRef } from 'react'
import Message from 'components/Message'
import { useChat } from 'hooks'

interface Props {
  className?: string
}

export default function Chat ({
  className = ''
}: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, isTyping, gptTyping } = useChat()

  useEffect(() => {
    const { current: $div } = divRef

    if (!$div) return

    $div.scrollTop = $div.scrollHeight
  }, [messages, gptTyping])

  return (
    <div className={`flex flex-col gap-8 max-h-full overflow-y-auto ${className}`} ref={divRef}>
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