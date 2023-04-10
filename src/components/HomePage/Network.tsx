import useUsernameStore from '@/libs/store/useUsernameStore'
import { Plus, Power } from '@phosphor-icons/react'
import { Post } from '../Post'
import { useFetchPosts } from '@/libs/react-query/queries/posts'
import { useState } from 'react'
import { Post as PostType } from '@/@types/types'

interface NetworkProps {
  username: string
}

export function Network({ username }: NetworkProps) {
  const [postEdit, setPostEdit] = useState<PostType | null>()
  const [postDelete, setPostDelete] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [key, setKey] = useState(0)
  const unregister = useUsernameStore((state) => state.removeUsername)
  const { data } = useFetchPosts()

  function openModal() {
    setKey(Math.random())
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setPostEdit(null)
  }

  function handleEditPost(data: PostType) {
    setPostEdit(data)
    openModal()
  }

  function closeDeleteModal() {
    setIsOpenDelete(false)
  }

  function openModalDelete() {
    setKey(Math.random())
    setIsOpenDelete(true)
  }

  function handleDeletePost(data: number) {
    setPostDelete(data)
    openModalDelete()
  }

  return (
    <>
      <section className="h-full w-full bg-zinc-100 relative">
        <header className="w-full bg-accent sticky top-0 shadow-lg z-20">
          <div className="px-4 h-20 max-w-[50rem] flex items-center justify-between mx-auto">
            <h1 className="font-bold text-white text-lg lg:text-[22px]">
              Codeleap Network
            </h1>
            <button
              type="button"
              onClick={openModal}
              className="flex items-center text-lg lg:text-lg text-white hover:text-accentGreen"
            >
              <Plus size={32} weight="bold" />
              <span>New Post</span>
            </button>
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
        <div className="h-full max-w-[50rem] bg-white mx-auto overflow-y-auto pb-8 ">
          {data &&
            data?.results.map((post) => {
              return (
                <Post.Card
                  post={post}
                  key={post.id}
                  username={username}
                  handleEdit={handleEditPost}
                  handleDelete={handleDeletePost}
                />
              )
            })}
        </div>
      </section>

      {data && (
        <Post.CreateOrEditModal
          key={key}
          closeModal={closeModal}
          isOpen={isOpen}
          username={username}
          post={postEdit}
        />
      )}

      {data && (
        <Post.DeleteModal
          key={key}
          closeModal={closeDeleteModal}
          isOpen={isOpenDelete}
          id={postDelete}
        />
      )}
    </>
  )
}
