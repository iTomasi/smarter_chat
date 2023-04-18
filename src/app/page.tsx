import {
  ChatForm,
  Chat
} from 'components/home'

import { ChatProvider } from 'context/chat'

export default function Page () {
  return (
    <ChatProvider>
      <div className="flex h-screen">
        <div className="min-w-[17rem] max-w-[17rem] bg-gray-200 dark:bg-stone-900 border-r border-gray-300 dark:border-stone-700"></div>

        <div className="w-full">
          <div className="p-8 max-w-screen-xl mx-auto h-full flex flex-col justify-end gap-8">
            <Chat/>
            <ChatForm/>
          </div>
        </div>
      </div>
    </ChatProvider>
  )
}