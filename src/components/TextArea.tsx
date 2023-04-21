interface Props {
  placeholder: string
  name: string
  disabled?: boolean
}

export default function TextArea ({
  placeholder,
  name,
  disabled
}: Props) {
  return (
    <textarea
      className="w-full h-[2.75rem] min-h-[2.75rem] max-h-[5rem] px-4 py-3 bg-stone-800 focus:outline-none rounded-md resize-none disabled:opacity-50 disabled:cursor-not-allowed"
      placeholder={placeholder}
      name={name}
      disabled={disabled}
    />
  )
}