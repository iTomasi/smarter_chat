import NewChatButton from './NewChatButton'
import ChatLinkCard from './ChatLinkCard'


export default function Top () {

  return (
    <div>
      <div className="max-h-[calc(100vh-14rem)] lg:max-h-[calc(100vh-9rem)] overflow-y-auto">
        {
          Array.from(Array(5).keys()).map(() => (
            <ChatLinkCard
          id={2}
          name="Test"
        />
          ))
        }
      </div>
      <NewChatButton/>
    </div>
  )
}
