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
          <div className="h-16 bg-stone-950 lg:hidden"></div>
          <div className="max-w-screen-lg mx-auto h-[calc(100%-4rem)] lg:h-full flex flex-col justify-end gap-8">
            <Chat className="pt-8 px-8"/>
            <ChatForm className="px-8 pb-8" />
          </div>
        </div>
      </div>
    </ChatProvider>
  )
}