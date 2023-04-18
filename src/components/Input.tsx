import type { ReactNode } from 'react'

interface Props {
  name: string
  placeholder: string
  autoComplete?: 'on' | 'off'
  JsxRight?: ReactNode
  disabled?: boolean
}

export default function Input ({
  name,
  placeholder,
  autoComplete,
  JsxRight,
  disabled
}: Props) {
  return (
    <div className='relative flex w-full focus-within:ring-2 focus-within:ring-fuchsia-600 rounded-md overflow-hidden bg-gray-200 dark:bg-stone-800'>
      <input
        className="w-full px-4 min-h-[2.75rem] focus:outline-none bg-transparent"
        type="text"
        placeholder={placeholder}
        name={name} 
        autoComplete={autoComplete}
        disabled={disabled}
      />

      {
        JsxRight !== undefined && (
          <div className="min-w-[2.75rem] max-w-[2.75rem]">
            {JsxRight}
          </div>
        )
      }

      {
        disabled && (
          <div className="absolute inset-0 bg-black bg-opacity-50 cursor-not-allowed"></div>
        )
      }
    </div>
  )
}