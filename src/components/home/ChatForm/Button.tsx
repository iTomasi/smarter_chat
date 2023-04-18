import type { IconType } from 'react-icons'

interface Props {
  type?: 'submit' | 'button'
  icon: IconType
}

export default function Button ({
  type = 'submit',
  icon: Icon
}: Props) {
  return (
    <button
      className="min-w-[2.75rem] max-w-[2.75rem] min-h-[2.75rem] max-h-[2.75rem] grid place-items-center dark:bg-stone-800 rounded-full"
      type={type}
    >
      <Icon
        className="w-5 h-5"
      />
    </button>
  )
}
