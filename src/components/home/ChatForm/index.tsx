'use client'
import type { FormEvent } from 'react'
import { useEffect } from 'react'
import Input from 'components/Input'
import Button from './Button'
import { HiCog8Tooth, HiPaperAirplane } from 'react-icons/hi2'
import { toast } from 'sonner'
import { FetchChatGPT } from 'services'
import { useChat } from 'hooks'

export default function ChatForm () {
  const { isLoading, isTyping, setIsLoading, setIsTyping, setGptTyping, gptTyping, pushMessage } = useChat()

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

    pushMessage({
      role: 'user',
      content: message
    })

    setIsLoading(true)
    setGptTyping('')

    // @ts-ignore
    e.target.reset()

    const { error } = await FetchChatGPT(
      process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      {
        messages: [
          { role: 'user', content: message }
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

    setIsTyping(false)

    if (error) {
      toast.error(error)
    }
  }


  return (
    <div className="flex gap-4">
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