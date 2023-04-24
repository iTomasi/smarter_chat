import { Button } from 'components/buttons'
import { useChat } from 'hooks'

export default function NewChatButton () {
  const { createNewChat } = useChat()

  const handleOnClick = () => {
    createNewChat()

  }

  return (
    <div className="px-4 mt-4">
      <Button
        className="w-full justify-center"
        type="button"
        onClick={handleOnClick}
      >
        + New Chat
      </Button>
    </div>
  )
}
