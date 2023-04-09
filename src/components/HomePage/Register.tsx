import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../Form'
import { FormProvider, useForm } from 'react-hook-form'
import useUsernameStore from '@/libs/store/useUsernameStore'

const registerSchema = z.object({
  username: z
    .string()
    .nonempty({
      message: 'username is required',
    })
    .transform((name) => {
      return name
        .toLowerCase()
        .trim()
        .split(' ')
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(' ')
    }),
})

type registerData = z.infer<typeof registerSchema>

export function Register() {
  const registerForm = useForm<registerData>({
    resolver: zodResolver(registerSchema),
  })

  const updateUsername = useUsernameStore((state) => state.addUsername)

  const { handleSubmit, watch } = registerForm

  const isText = watch('username')

  function handleRegisterNewUsername(data: registerData) {
    updateUsername(data.username)
  }

  return (
    <div className="h-screen bg-zinc-200 flex items-center justify-center rounded-2xl shadow-xl pb-4">
      <div className="bg-white w-full max-w-[31.25rem] p-6 flex flex-col rounded-2xl">
        <h1 className="font-bold text-[22px] mb-6">
          Welcome to CodeLeap network!
        </h1>
        <FormProvider {...registerForm}>
          <form
            onSubmit={handleSubmit(handleRegisterNewUsername)}
            className="flex flex-col gap-4"
          >
            <Form.Field>
              <Form.Label htmlFor="username">
                Please enter your username
              </Form.Label>
              <Form.Input type="text" name="username" />
              <Form.ErrorMessage field="username" />
            </Form.Field>
            <div className="flex justify-end">
              <Form.Button text="ENTER" type="submit" disabled={!isText} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
