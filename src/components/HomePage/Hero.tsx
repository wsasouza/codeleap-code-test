import Image from 'next/image'
import logo from '@/assets/logo.svg'
import { CaretDown } from '@phosphor-icons/react'

export function Hero() {
  return (
    <section className="h-screen flex items-center justify-center px-4">
      <Image
        alt="codeleap logo"
        src={logo}
        quality={100}
        width={600}
        height={165}
        className="w-full max-w-[38rem] object-fit"
      />
      <a
        href="#app"
        className="leading-none absolute bottom-6 p-4 rounded-full hover:bg-zinc-200 animate-bounce"
      >
        <CaretDown size={38} weight="bold" />
      </a>
    </section>
  )
}
