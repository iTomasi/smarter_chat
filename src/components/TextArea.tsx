import type { KeyboardEvent } from 'react'

interface Props {
  placeholder: string
  name: string
  disabled?: boolean
  submitWithEnter?: boolean
}

export default function TextArea ({
  placeholder,
  name,
  disabled,
  submitWithEnter
}: Props) {
  const handleOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!submitWithEnter || e.key !== 'Enter' || e.shiftKey) return

    e.preventDefault()

    let $form: HTMLFormElement | null = null
    // @ts-ignore
    let target: HTMLElement = e.target

    while (target) {
      if (target.tagName !== 'FORM') {
        target = target.parentElement
        continue
      }

      $form = target as HTMLFormElement
      break
    }

    const event = new Event('submit', { cancelable: true, bubbles: true })
    
    $form?.dispatchEvent(event)
  }

  return (
    <textarea
      className="w-full h-[2.75rem] min-h-[2.75rem] max-h-[5rem] px-4 py-3 bg-stone-800 focus:outline-none rounded-md resize-none disabled:opacity-50 disabled:cursor-not-allowed"
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      onKeyDown={handleOnKeyDown}
    />
  )
}