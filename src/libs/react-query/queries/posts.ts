import { useQuery } from '@tanstack/react-query'
import { api } from '@/libs/services/api'

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

async function getPosts() {
  const { data } = await api.get<PostsData>('/careers/?limit=10')

  return data
}

export function useFetchPosts() {
  return useQuery(['posts'], getPosts)
}
