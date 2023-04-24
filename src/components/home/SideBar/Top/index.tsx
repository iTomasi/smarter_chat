import NewChatButton from './NewChatButton'
import ChatLinkCard from './ChatLinkCard'
import { useChat } from 'hooks'

export default function Top () {
  const { list } = useChat()

  return (
    <div>
      <div className="max-h-[calc(100vh-14rem)] lg:max-h-[calc(100vh-9rem)] overflow-y-auto">
        {
          list.map((value) => (
            <ChatLinkCard
              key={value.id}
              {...value}
            />
          ))
        }
      </div>
      <NewChatButton/>
    </div>
  )
}
