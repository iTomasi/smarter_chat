import type { ReactNode } from 'react'

interface Props {
  name: string
  placeholder: string
  autoComplete?: 'on' | 'off'
  JsxRight?: ReactNode
}

export default function Input ({
  name,
  placeholder,
  autoComplete,
  JsxRight
}: Props) {
  return (
    <div className="flex w-full focus-within:ring-2 focus-within:ring-fuchsia-600 rounded-md overflow-hidden bg-gray-200 dark:bg-stone-800">
      <input
        className="w-full px-4 min-h-[2.75rem] focus:outline-none bg-transparent"
        type="text"
        placeholder={placeholder}
        name={name} 
        autoComplete={autoComplete}
      />

      {
        JsxRight !== undefined && (
          <div className="min-w-[2.75rem] max-w-[2.75rem]">
            {JsxRight}
          </div>
        )
      }
    </div>
  )
}