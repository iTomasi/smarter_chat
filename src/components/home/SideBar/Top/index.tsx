import type { IData } from'./ChatLinks/ModalEditForm'
import NewChatButton from './NewChatButton'
import ChatLinks from './ChatLinks'
import { useChat } from 'hooks'

interface Props {
  onEditList: (value: IData) => void
}

export default function Top ({
  onEditList
}: Props) {
  const { list } = useChat()

  return (
    <div>
      <div className="max-h-[calc(100vh-14rem)] lg:max-h-[calc(100vh-9rem)] overflow-y-auto">
        <ChatLinks
          data={list}
          onEdit={onEditList}
        />
      </div>
      <NewChatButton/>
    </div>
  )
}
