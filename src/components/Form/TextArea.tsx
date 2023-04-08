import { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export function TextArea({ name, ...rest }: TextAreaProps) {
  const { register } = useFormContext()

  return (
    <textarea
      id={name}
      className="flex-1 rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...register(name)}
      {...rest}
    />
  )
}
