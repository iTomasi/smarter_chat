'use client'
import Link from 'next/link'
import { useChat } from 'hooks'

interface Props {
  id: number
  name: string
}

export default function ChatLinkCard ({
  id,
  name
}: Props) {
  const { id: chatId } = useChat()

  return (
    <div className={`flex border-b border-stone-700 ${chatId === id ? 'bg-stone-600' : 'bg-stone-900'}`}>
      <Link
        className="h-14 w-full flex items-center pl-4"
        href={`/?chat_id=${id}`}
      >
        {name}
      </Link>
    </div>
  )

}