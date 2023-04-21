import type { FormEvent } from 'react'
import { useEffect, useRef } from 'react'
import { ModalNormal } from 'components/modals'
import Input from 'components/Input'
import { Button } from 'components/buttons'
import { useApiKey } from 'hooks'
import { toast } from 'sonner'

interface Props {
  show: boolean
  setShow: (value: boolean | ((prev: boolean) => boolean)) => void
}

export default function Modal ({
  show,
  setShow
}: Props) {
  const { openai, handlers: { setApiKey } } = useApiKey()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const { current: $input } = inputRef

    if ($input === null) return

    $input.value = openai ?? ''
  }, [openai])

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { openai } = Object.fromEntries(new FormData(e.currentTarget)) as { openai: string }

    setApiKey('openai', openai)

    // TEMPORAL
    localStorage.setItem('iw_openai', openai)

    toast.success('Api key saved successfully')

    setShow(false)
  }

  return (
    <ModalNormal show={show} setShow={setShow}>
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <Input
          ref={inputRef}
          placeholder="OpenAI Api Key"
          autoComplete="off"
          name="openai"
        />

        <Button className="justify-center">Save</Button>
      </form>
    </ModalNormal>
  )
}
