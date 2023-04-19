'use client'
import { useState } from 'react'
import { Button } from 'components/buttons'
import { HiCog8Tooth } from 'react-icons/hi2'
import { ModalNormal } from 'components/modals'

export default function Settings () {
  const [show, setShow] = useState<boolean>(false)

  const handleOnClick = () => {
    setShow(true)
  }

  return (
    <>
    <Button
      className="w-full gap-4 py-3"
      type="button"
      color="transparent"
      onClick={handleOnClick}
    >
      <HiCog8Tooth
        className="w-8 h-8"
      />

      <span>Settings</span>
    </Button>

    <ModalNormal show={show} setShow={setShow}>
      asdasd

    </ModalNormal>
    </>
  )
}
