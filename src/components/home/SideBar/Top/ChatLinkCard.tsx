import Link from 'next/link'

interface Props {
  id: number
  name: string
}

export default function ChatLinkCard ({
  id,
  name
}: Props) {
  return (
    <div className="flex border-b border-stone-700">
      <Link
        className="h-14 w-full flex items-center pl-4"
        href={`/?chat_id=${id}`}
      >
        {name}
      </Link>
    </div>
  )

}