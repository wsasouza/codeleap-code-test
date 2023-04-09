import useUsernameStore from '@/libs/store/useUsernameStore'
import { Power } from '@phosphor-icons/react'
import { Post } from '../Post'

interface NetworkProps {
  username: string
}

export function Network({ username }: NetworkProps) {
  const unregister = useUsernameStore((state) => state.removeUsername)

  const post = {
    id: 2573,
    username: 'Walter',
    created_datetime: '2023-04-08T11:06:17.878963Z',
    title: 'First Post',
    content:
      'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipitt',
  }

  return (
    <section className="h-screen w-full bg-zinc-100 ">
      <header className="w-full bg-accent">
        <div className="px-4 h-20 max-w-[50rem] flex items-center justify-between mx-auto">
          <h1 className="font-bold text-white text-lg lg:text-[22px]">
            Codeleap Network
          </h1>
          <button
            type="button"
            onClick={unregister}
            className="text-zinc-100 flex items-center gap-2 hover:text-accentRed "
          >
            <span className="text-md lg:text-lg">{username}</span>
            <Power size={28} weight="bold" />
          </button>
        </div>
      </header>
      <div className="max-h-[51.6rem] h-full max-w-[50rem] bg-white mx-auto  rounded-b-2xl overflow-hidden">
        <Post.Card post={post} />
      </div>
    </section>
  )
}
