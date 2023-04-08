import { ButtonHTMLAttributes } from 'react'
import { variantButtonStyles } from '@/utils/variantButtonStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning'
  text: string
}

export function Button({ variant = 'primary', text, ...props }: ButtonProps) {
  const styleButton = variantButtonStyles[variant]

  return (
    <button
      className={`${
        variant === 'tertiary' && !props.disabled
          ? 'border border-zinc-800'
          : 'border-none'
      } min-w-[7.5rem] rounded-lg shadow-sm px-3 py-2  disabled:text-white disabled:cursor-not-allowed`}
      style={{
        ...styleButton,
        backgroundColor: props.disabled
          ? '#b1b1b1'
          : styleButton.backgroundColor,
        color: props.disabled ? '#fff' : styleButton.color,
      }}
      {...props}
    >
      {text}
    </button>
  )
}
