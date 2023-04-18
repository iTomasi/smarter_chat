import {
  ChatForm
} from 'components/home'

export default function Page () {
  return (
    <div className="flex h-screen">
      <div className="min-w-[17rem] max-w-[17rem] bg-gray-200 dark:bg-stone-900 border-r border-gray-300 dark:border-stone-700"></div>

      <div className="w-full">
        <div className="p-8 h-full flex flex-col justify-end">
          <ChatForm/>
        </div>
      </div>
    </div>
  )
}