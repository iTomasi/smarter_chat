import type { ReactNode, MouseEventHandler } from 'react'

interface Props {
  className?: string
  type?: 'button' | 'submit'
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: keyof typeof colors
}

const colors = {
  primary: 'bg-fuchsia-500',
  transparent: 'bg-transparent',
  red: 'bg-red-500'
}

export default function Button ({
  className = '',
  type = 'submit',
  children,
  onClick,
  color = 'primary'
}: Props) {
  if (type !== 'button' && typeof onClick === 'function') throw new Error(`<Button type="${type}" /> can not use onClick prop only for "button" type`)

  const theClassName = `min-h-[2.75rem] px-4 rounded-md flex items-center ${colors[color] ?? colors.primary}`

  return (
    <button
      className={`${theClassName} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
