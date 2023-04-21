import type { IconType } from 'react-icons'

interface Props {
  type?: 'submit' | 'button'
  icon: IconType
  color?: keyof typeof colors
}

const colors = {
  primary: 'bg-fuchsia-500'
}

export default function Button ({
  type = 'submit',
  icon: Icon,
  color = 'primary'
}: Props) {
  const colorClassName = colors[color] ?? colors.primary

  return (
    <button
      className={`min-w-[2.75rem] max-w-[2.75rem] min-h-[2.75rem] max-h-[2.75rem] grid place-items-center rounded-full ${colorClassName}`}
      type={type}
    >
      <Icon
        className="w-5 h-5"
      />
    </button>
  )
}
