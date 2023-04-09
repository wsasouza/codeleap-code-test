import { useMutation } from '@tanstack/react-query'
import { api } from '@/libs/services/api'
import { Post, UpdatePost } from '@/@types/types'

async function createPost(data: Partial<Post>) {
  const { status } = await api.post('/careers/', data)

  return status
}

async function updatedPost(data: UpdatePost) {
  const { status } = await api.patch(`/careers/${data.id}/`, data.updatePost)

  return status
}

async function deletePost(data: number) {
  const { status } = await api.delete(`/careers/${data}/`)

  return status
}

export function useCreatePost() {
  return useMutation(createPost)
}

export function useUpdatePost() {
  return useMutation(updatedPost)
}

export function useDeletePost() {
  return useMutation(deletePost)
}
