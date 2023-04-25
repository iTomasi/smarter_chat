'use client'
import Link from 'next/link'
import { useChat } from 'hooks'
import { HiPencilSquare } from 'react-icons/hi2'

interface IData {
  id: number
  name: string
}

interface Props extends IData {
  onEdit: (value: IData) => void
}

export default function Card ({
  id,
  name,
  onEdit
}: Props) {
  const { id: chatId } = useChat()

  const handleOnClickEdit = () => {
    onEdit({
      id,
      name
    })
  }

  return (
    <div className={`flex border-b border-stone-700 ${chatId === id ? 'bg-stone-600' : 'bg-stone-900'}`}>
      <Link
        className="h-14 w-full flex items-center pl-4"
        href={`/?chat_id=${id}`}
      >
        {name}
      </Link>

      {
        chatId === id && (
          <button
            className="min-w-[3rem] max-w-[3rem] grid place-items-center"
            type="button"
            onClick={handleOnClickEdit}
          >
            <HiPencilSquare
              className="w-6 h-6"
            />
          </button>
        )
      }
    </div>
  )
}
