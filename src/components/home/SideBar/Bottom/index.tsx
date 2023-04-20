import type { MouseEventHandler } from 'react'
import Settings from './Settings'

interface Props {
  onClickSettings: MouseEventHandler<HTMLButtonElement>
}

export default function Bottom ({
  onClickSettings
}: Props) {
  return (
    <div className="border-t border-gray-300 dark:border-stone-700">
      <Settings
        onClick={onClickSettings}
      />
    </div>
  )
}

export * from './Settings'