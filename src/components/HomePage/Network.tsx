import useUsernameStore from '@/libs/store/useUsernameStore'
import { Power } from '@phosphor-icons/react'
import { Post } from '../Post'
import { useFetchPosts } from '@/libs/react-query/queries/posts'

interface NetworkProps {
  username: string
}

export function Network({ username }: NetworkProps) {
  const unregister = useUsernameStore((state) => state.removeUsername)
  const { data } = useFetchPosts()

  return (
    <section className="h-full w-full bg-zinc-100">
      <header className="w-full bg-accent sticky top-0 shadow-lg">
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
      <div className="h-full max-w-[50rem] bg-white mx-auto overflow-y-auto pb-8">
        {data &&
          data?.results.map((post) => {
            return <Post.Card post={post} key={post.id} />
          })}
      </div>
    </section>
  )
}
