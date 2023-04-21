'use client'
import type { FormEvent } from 'react'
import type { IGptMessage } from 'types/Gpt'
import { useEffect } from 'react'
import Input from 'components/Input'
import Button from './Button'
import { HiCog8Tooth, HiPaperAirplane } from 'react-icons/hi2'
import { toast } from 'sonner'
import { FetchChatGPT } from 'services'
import { useChat, useApiKey } from 'hooks'

interface Props {
  className?: string
}

export default function ChatForm ({
  className = ''
}: Props) {
  const { isLoading, isTyping, setIsLoading, setIsTyping, setGptTyping, gptTyping, pushMessage, messages } = useChat()
  const { openai } = useApiKey()

  useEffect(() => {
    if (
      isTyping ||
      (!isTyping && !gptTyping)
    ) return

    pushMessage({
      role: 'assistant',
      content: gptTyping
    })
  }, [isTyping])

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { message } = Object.fromEntries(new FormData(e.currentTarget)) as { message?: string }

    if (!message || isLoading || isTyping) return
    else if (!openai) {
      toast.error('OpenAi Api key is required, click in settings')
      return
    }

    const userPayload: IGptMessage = {
      role: 'user',
      content: message
    }

    pushMessage(userPayload)

    setIsLoading(true)
    setGptTyping('')

    // @ts-ignore
    e.target.reset()

    const { error } = await FetchChatGPT(
      openai,
      {
        messages: [
          ...messages,
          userPayload
        ],
        onChunk: (value) => {
          if (!isTyping) {
            setIsLoading(false)
            setIsTyping(true)
          }

          setGptTyping((prev) => prev + value)
        }
      }
    )

    setIsLoading(false)
    setIsTyping(false)

    if (error) {
      toast.error(error)
    }
  }


  return (
    <div className={`flex gap-4 ${className}`}>
      <form
        className="w-full"
        onSubmit={handleOnSubmit}
      >
        <Input
          placeholder="Write a message"
          name="message"
          autoComplete="off"
          JsxRight={
            <button
              className="h-full w-full grid place-items-center"
            >
              <HiPaperAirplane
                className="w-5 h-5"
              />
            </button>
          }
          disabled={isLoading || isTyping}
        />
      </form>

      <Button
        type="button"
        icon={HiCog8Tooth}
      />
    </div>
  )
}