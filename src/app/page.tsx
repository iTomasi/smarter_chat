import {
  ChatForm,
  Chat,
  SideBar
} from 'components/home'

import { ChatProvider } from 'context/chat'

export default function Page () {
  return (
    <ChatProvider>
      <div className="flex h-screen">
        <SideBar/>
        
        <div className="w-full">
          <div className="p-8 max-w-screen-lg mx-auto h-full flex flex-col justify-end gap-8">
            <Chat/>
            <ChatForm/>
          </div>
        </div>
      </div>
    </ChatProvider>
  )
}