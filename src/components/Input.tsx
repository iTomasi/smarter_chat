import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'

interface Props {
  className?: string
  type?: 'text' | 'password'
  name: string
  placeholder: string
  labelTitle?: string
  autoComplete?: 'on' | 'off'
  JsxRight?: ReactNode
  disabled?: boolean
}

const iconClassName = 'w-5 h-5'

function Input ({
  className,
  type = 'text',
  name,
  placeholder,
  labelTitle,
  autoComplete,
  JsxRight,
  disabled
}: Props, ref: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleOnClickEye = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className={className}>
      {
        labelTitle && <label className="block mb-2">{labelTitle}</label>
      }
      <div className='relative flex w-full focus-within:ring-2 focus-within:ring-fuchsia-600 rounded-md overflow-hidden bg-gray-200 dark:bg-stone-800'>
        <input
          ref={ref}
          className="w-full px-4 min-h-[2.75rem] focus:outline-none bg-transparent"
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          name={name} 
          autoComplete={autoComplete}
          disabled={disabled}
        />

        {
          (JsxRight !== undefined && type !== 'password') && (
            <div className="min-w-[2.75rem] max-w-[2.75rem]">
              {JsxRight}
            </div>
          )
        }

        {
          type === 'password' && (
            <button
              className="min-w-[2.75rem] max-w-[2.75rem] grid place-items-center"
              type="button"
              onClick={handleOnClickEye}
            >
              {
                showPassword
                  ? <HiEye className={iconClassName} />
                  : <HiEyeSlash className={iconClassName} />
              }
            </button>
          )
        }

        {
          disabled && (
            <div className="absolute inset-0 bg-black bg-opacity-50 cursor-not-allowed"></div>
          )
        }
      </div>
    </div>
  )
}

export default forwardRef(Input)
