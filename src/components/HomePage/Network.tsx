import useUsernameStore from '@/libs/store/useUsernameStore'
import { Power } from '@phosphor-icons/react'

interface NetworkProps {
  username: string
}

export function Network({ username }: NetworkProps) {
  const unregister = useUsernameStore((state) => state.removeUsername)

  return (
    <section className="h-screen w-full bg-zinc-300">
      <header className="w-full bg-accent">
        <div className="h-20 max-w-[50rem] flex items-center justify-between mx-auto">
          <h1 className="font-bold text-white text-[22px]">Codeleap Network</h1>
          <button
            type="button"
            onClick={unregister}
            className="text-zinc-100 flex items-center gap-2 hover:text-accentRed "
          >
            <span className="text-[18px]">{username}</span>
            <Power size={28} weight="bold" />
          </button>
        </div>
      </header>
    </section>
  )
}
