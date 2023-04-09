import { useQuery } from '@tanstack/react-query'
import { api } from '@/libs/services/api'
import { PostsData } from '@/@types/types'

async function getPosts() {
  const { data } = await api.get<PostsData>('/careers/?limit=20')

  return data
}

export function useFetchPosts() {
  return useQuery(['posts'], getPosts)
}
