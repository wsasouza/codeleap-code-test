import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import Head from 'next/head'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/libs/services/queryClient'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CodeLeap | Code Test</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  )
}
