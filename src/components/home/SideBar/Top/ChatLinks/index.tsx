import type { IData } from './ModalEditForm'
import { useState } from 'react'
import Card from './Card'

interface Props {
  data: IData[]
  onEdit: (value: IData) => void
}

export default function ChatLinks ({
  data: list,
  onEdit
}: Props) {
  return (
    <>
    {
      list.map((value) => (
        <Card
          key={value.id}
          {...value}
          onEdit={onEdit}
        />
      ))
    }
    </>
  )
}
