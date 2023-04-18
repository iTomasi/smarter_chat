interface Props {
  from: 'gpt' | 'me'
  content: string
}

export default function Message ({
  from,
  content
}: Props) {
  return (
    <div className={`flex gap-2 ${from === 'gpt' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] rounded-full ${from === 'gpt' ? 'bg-fuchsia-500' : 'bg-sky-500'}`}></div>

      <div className="bg-gray-200 dark:bg-stone-800 p-3 rounded-md break-words max-w-[75ch]">
        {content}
      </div>
    </div>
  )
}
