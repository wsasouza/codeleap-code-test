import { Fragment } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Transition } from '@headlessui/react'
import { XCircle } from '@phosphor-icons/react'
import { Post, UpdatePost } from '@/@types/types'
import {
  useCreatePost,
  useUpdatePost,
} from '@/libs/react-query/mutations/posts'
import { Form } from '../Form'

interface CreateOrEditModalProps {
  username: string
  post?: Post | null
  isOpen: boolean
  closeModal: () => void
}

const createPostSchema = z.object({
  title: z
    .string()
    .nonempty({
      message: 'title is required',
    })
    .transform((name) => {
      return name
        .toLowerCase()
        .trim()
        .split(' ')
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(' ')
    }),
  content: z.string().nonempty({
    message: 'content is required',
  }),
})

type CreatePostData = z.infer<typeof createPostSchema>

export function CreateOrEditModal({
  username,
  post,
  isOpen,
  closeModal,
}: CreateOrEditModalProps) {
  const queryClient = useQueryClient()
  const initialValues = {} as Partial<Post>
  const createNewPostMutation = useCreatePost()
  const updatePostMutation = useUpdatePost()
  const textButton = post ? 'Save' : 'Create'
  const colorButton = post ? 'secondary' : 'primary'

  if (post) {
    initialValues.title = post.title
    initialValues.content = post.content
  }

  const createPostForm = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: initialValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = createPostForm

  const isTextTitle = watch('title')
  const isTextContent = watch('content')
  const buttonStatus = !(!!isTextTitle && !!isTextContent) || isSubmitting

  function handleCloseModal() {
    closeModal()
  }

  function handleCreateOrEditPost(data: CreatePostData) {
    if (post) {
      const id = post.id
      const updatePost = {
        title: data.title,
        content: data.content,
      }

      const updateData: UpdatePost = { id, updatePost }

      updatePostMutation.mutate(updateData, {
        onSuccess() {
          queryClient.invalidateQueries(['posts'])
          // toast.info('Tipo de Ato atualizado com sucesso.')
        },
        onError(error) {
          console.log(error)
          // toast.error('Ocorreu um erro ao editar Tipo de Ato.')
        },
      })
    } else {
      const newPost = {
        username,
        title: data.title,
        content: data.content,
      }

      createNewPostMutation.mutate(newPost, {
        onSuccess() {
          queryClient.invalidateQueries(['posts'])
          // toast.success('Tipo de Ato criado com sucesso.')
        },
        onError(error) {
          console.log(error)
          // toast.error('Ocorreu um erro ao criar Tipo de Ato.')
        },
      })
    }

    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[48rem] transform  rounded-2xl bg-white pb-4 text-left align-middle shadow-xl transition-all ">
                <Dialog.Title
                  as="div"
                  className="px-4 py-4 flex items-center justify-between"
                >
                  {post ? (
                    <span className="font-bold text-zinc-900 text-lg">
                      Edit item
                    </span>
                  ) : (
                    <span className="font-bold text-zinc-900 text-lg">
                      What’s on your mind?
                    </span>
                  )}

                  <div className="flex gap-2 items-center">
                    <button
                      onClick={closeModal}
                      className="text-zinc-600 hover:text-zinc-900 leading-none"
                      title="Close"
                    >
                      <XCircle size={28} weight="bold" />
                    </button>
                  </div>
                </Dialog.Title>
                <div className="px-6 pt-4 pb-4">
                  <FormProvider {...createPostForm}>
                    <form
                      onSubmit={handleSubmit(handleCreateOrEditPost)}
                      className="flex flex-col gap-4"
                    >
                      <Form.Field>
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Input
                          type="text"
                          name="title"
                          placeholder="Hello world"
                          defaultValue={initialValues.title}
                        />
                        <Form.ErrorMessage field="title" />
                      </Form.Field>

                      <Form.Field>
                        <Form.Label htmlFor="content">Content</Form.Label>
                        <Form.TextArea
                          name="content"
                          placeholder="Content here"
                        />
                      </Form.Field>

                      <div className="flex items-center gap-4 justify-end">
                        <Form.Button
                          type="button"
                          text="Cancelar"
                          variant="tertiary"
                          onClick={handleCloseModal}
                        />
                        <Form.Button
                          type="submit"
                          text={textButton}
                          variant={colorButton}
                          disabled={buttonStatus}
                        />
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
