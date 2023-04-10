import { format, formatDistanceToNow } from 'date-fns'
import { Post } from '@/@types/types'
import enGB from 'date-fns/locale/en-GB'
import { NotePencil, Trash } from '@phosphor-icons/react'

interface CardProps {
  username: string
  post: Post
  handleEdit: (post: Post) => void
  handleDelete: (id: number) => void
}

export function Card({ post, username, handleEdit, handleDelete }: CardProps) {
  const publishedDateFormatted = format(
    new Date(post.created_datetime),
    "d LLLL 'at' HH:mm",
    { locale: enGB },
  )

  const publishedDateRelativeToNow = formatDistanceToNow(
    new Date(post.created_datetime),
    {
      locale: enGB,
      addSuffix: true,
    },
  )

  return (
    <div className="w-full max-w-[48rem] mx-auto mt-6 border border-accent rounded-2xl">
      <header className="w-full bg-accent rounded-t-2xl h-[4.375rem] flex items-center px-6">
        <div className="flex items-center gap-4 justify-between w-full text-white">
          <h2 className="text-[22px] font-bold truncate ..." title={post.title}>
            {post.title}
          </h2>
          {username === post.username && (
            <div className="flex items-center gap-8">
              <button
                type="button"
                title="Delete Post"
                onClick={() => handleDelete(post.id)}
                className="hover:text-accentRed"
              >
                <Trash size={24} weight="bold" />
              </button>
              <button
                type="button"
                title="Edit Post"
                onClick={() => handleEdit(post)}
                className="hover:text-accentGreen"
              >
                <NotePencil size={24} weight="bold" />
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="p-6 flex items-center gap-4 justify-between text-zinc-500 text-lg">
        <span className="font-bold truncate ..." title={post.username}>
          @{post.username}
        </span>
        <time
          title={publishedDateFormatted}
          dateTime={new Date(post.created_datetime).toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </div>
      <div className="px-6 pb-6 w-full overflow-x-clip">{post.content}</div>
    </div>
  )
}
