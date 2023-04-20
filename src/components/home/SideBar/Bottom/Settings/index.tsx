'use client'
import type { MouseEventHandler } from 'react'
import { Button } from 'components/buttons'
import { HiCog8Tooth } from 'react-icons/hi2'

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Settings ({
  onClick
}: Props) {
  return (
    <Button
      className="w-full gap-4 py-3"
      type="button"
      color="transparent"
      onClick={onClick}
    >
      <HiCog8Tooth
        className="w-8 h-8"
      />

      <span>Settings</span>
    </Button>
  )
}

export { default as ModalSettings } from './Modal'
