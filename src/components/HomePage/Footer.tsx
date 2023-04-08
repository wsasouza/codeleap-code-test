import { GithubLogo } from '@phosphor-icons/react'

export function Footer() {
  return (
    <div className="w-full flex items-center justify-center py-4">
      <a
        href="https://github.com/wsasouza"
        target="_blank"
        rel="noopener noreferrer"
        className="leading-none hover:bg-zinc-200 p-4 rounded-full animate-bounce text-zinc-700"
      >
        <GithubLogo size={38} weight="bold" />
      </a>
    </div>
  )
}
