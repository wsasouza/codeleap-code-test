import { format, formatDistanceToNow } from 'date-fns'
import enGB from 'date-fns/locale/en-GB'

interface CardProps {
  post: {
    id: number
    username: string
    created_datetime: string
    title: string
    content: string
  }
}

export function Card({ post }: CardProps) {
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
        <h2 className="text-[22px] text-white font-bold">{post.title}</h2>
      </header>
      <div className="p-6 flex items-center justify-between text-zinc-500 text-lg">
        <span className="font-bold ">@{post.username}</span>
        <time
          title={publishedDateFormatted}
          dateTime={new Date(post.created_datetime).toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </div>
      <div className="px-6 pb-6 space-y-4">
        <p>{post.content}</p>
      </div>
    </div>
  )
}
