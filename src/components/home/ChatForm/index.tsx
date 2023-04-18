'use client'
import type { FormEvent } from 'react'
import Input from 'components/Input'
import Button from './Button'
import { HiCog8Tooth, HiPaperAirplane } from 'react-icons/hi2'
import { toast } from 'sonner'
import { FetchChatGPT } from 'services'

export default function ChatForm () {
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { message } = Object.fromEntries(new FormData(e.currentTarget)) as { message?: string }

    if (!message) return

    await FetchChatGPT(
      '',
      {
        messages: [
          { role: 'user', content: message }
        ],
        onChunk: (value) => {
          console.log(value)
        }
      }
    )



    toast.success('lol')
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
        />
      </form>

      <Button
        type="button"
        icon={HiCog8Tooth}
      />
    </div>
  )
}