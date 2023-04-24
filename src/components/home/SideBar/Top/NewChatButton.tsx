import { Button } from 'components/buttons'
import { useChat } from 'hooks'

export default function NewChatButton () {
  const { createNewChat } = useChat()

  return (
    <div className="px-4 mt-4">
      <Button
        className="w-full justify-center"
        type="button"
        onClick={createNewChat}
      >
        + New Chat
      </Button>
    </div>
  )
}
