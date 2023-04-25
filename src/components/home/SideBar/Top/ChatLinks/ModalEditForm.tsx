import type { FormEvent } from 'react'
import { useRef, useEffect } from 'react'
import { ModalNormal } from 'components/modals'
import Input from 'components/Input'
import { Button } from 'components/buttons'
import { toast } from 'sonner'
import { useChat } from 'hooks'

export interface IData {
  id: number
  name: string
}

interface Props {
  data: IData
  setData: (value: IData | null | ((prev: IData | null) => IData | null)) => void
}

export default function ModalEditForm ({
  data,
  setData
}: Props) {
  const { updateList, removeList } = useChat()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (data === null) return

    const { current: $input } = inputRef

    if (!$input) return

    $input.value = data.name
  }, [data])

  const handleSetShow = () => {
    setData(null)
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (data === null) return

    const { name } = Object.fromEntries(new FormData(e.currentTarget)) as { name: string }

    if (!name) {
      toast.error('Chat name is required')
      return
    }

    const updated = await updateList(data.id, { name })

    if (!updated) {
      toast.error('Can not update')
      return
    }

    toast.success('Chat name updated sucessfully!')

    setData(null)
  }

  const handleOnClickRemove = async () => {
    if (data === null) return

    const remove = await removeList(data.id)

    if (remove !== null) {
      toast.error(remove)
      return
    }

    setData(null)
  }
  
  return (
    <ModalNormal show={Boolean(data)} setShow={handleSetShow}>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 mb-4">
        <Input
          ref={inputRef}
          labelTitle="Chat name"
          placeholder="ex. New Chat"
          name="name"
        />

        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>

      <Button
        type="button"
        className="w-full justify-center"
        color="red"
        onClick={handleOnClickRemove}
        >
          Remove
        </Button>
    </ModalNormal>
  )
}
