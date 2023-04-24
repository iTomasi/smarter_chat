import {
  ChatForm,
  Chat,
  SideBar
} from 'components/home'

export default function Page () {
  return (
    <div className="flex h-screen">
      <SideBar/>
      
      <div className="w-full">
        <div className="h-16 bg-stone-950 lg:hidden"></div>
        <div className="max-w-screen-lg mx-auto h-[calc(100dvh-4rem)] lg:h-full flex flex-col justify-end gap-8">
          <Chat className="pt-8 px-4"/>
          <ChatForm className="px-4 pb-8" />
        </div>
      </div>
    </div>
  )
}
