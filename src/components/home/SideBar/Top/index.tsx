import NewChatButton from './NewChatButton'
import ChatLinkCard from './ChatLinkCard'
import { useChat } from 'hooks'

export default function Top () {
  const { list } = useChat()

  return (
    <div>
      <div>
        {
          list.map((value) => (
            <ChatLinkCard
              key={value.id}
              id={value.id}
              name={value.name}
            />
          ))
        }
      </div>
      <NewChatButton/>
    </div>
  )
}
