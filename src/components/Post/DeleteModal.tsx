import { Fragment } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Dialog, Transition } from '@headlessui/react'
import { XCircle } from '@phosphor-icons/react'
import { useDeletePost } from '@/libs/react-query/mutations/posts'

import { Form } from '../Form'

interface CreateOrEditModalProps {
  id: number
  isOpen: boolean
  closeModal: () => void
}

export function DeleteModal({
  id,
  isOpen,
  closeModal,
}: CreateOrEditModalProps) {
  const queryClient = useQueryClient()
  const deletePostMutation = useDeletePost()

  function handleCloseModal() {
    closeModal()
  }

  function handleDeletePost() {
    deletePostMutation.mutate(id, {
      onSuccess() {
        queryClient.invalidateQueries(['posts'])
        // toast.info('Tipo de Ato atualizado com sucesso.')
      },
      onError(error) {
        console.log(error)
        // toast.error('Ocorreu um erro ao editar Tipo de Ato.')
      },
    })

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
                  <h2>Are you sure you want to delete this item?</h2>
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
                  <div className="flex items-center gap-4 justify-end">
                    <Form.Button
                      type="button"
                      text="Cancelar"
                      variant="tertiary"
                      onClick={handleCloseModal}
                    />
                    <Form.Button
                      type="button"
                      text="Delete"
                      variant="warning"
                      onClick={handleDeletePost}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
