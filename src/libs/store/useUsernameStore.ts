import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UsernameStore = {
  username: string
  addUsername: (username: string) => void
  removeUsername: () => void
}

const useUsernameStore = create(
  persist<UsernameStore>(
    (set) => ({
      username: '',
      addUsername: (username: string) => {
        set(() => ({
          username,
        }))
      },
      removeUsername: () => {
        set(() => ({
          username: '',
        }))
      },
    }),
    {
      name: '@codeleap-user',
    },
  ),
)

export default useUsernameStore
