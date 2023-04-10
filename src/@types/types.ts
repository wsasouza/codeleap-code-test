export type Post = {
  id: number
  username: string
  title: string
  content: string
  created_datetime: string
}

export type PostsData = {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}

export type UpdateData = {
  title: string
  content: string
}

export interface UpdatePost {
  id: number
  updatePost: UpdateData
}
