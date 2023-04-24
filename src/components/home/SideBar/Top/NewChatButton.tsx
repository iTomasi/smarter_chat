import { Button } from 'components/buttons'

export default function NewChatButton () {
  return (
    <div className="px-4 mt-4">
      <Button
        className="w-full justify-center"
        type="button"
      >
        + New Chat
      </Button>
    </div>
  )
}
