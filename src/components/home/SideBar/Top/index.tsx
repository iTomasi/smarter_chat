import NewChatButton from './NewChatButton'
import ChatLinkCard from './ChatLinkCard'

export default function Top () {

  return (
    <div>
      <div>
        <ChatLinkCard
          id={2}
          name="Test"
        />
      </div>
      <NewChatButton/>
    </div>
  )
}
