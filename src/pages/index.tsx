import { Home } from '@/components/HomePage'
import useUsernameStore from '@/libs/store/useUsernameStore'

export default function HomePage() {
  const username = useUsernameStore((state) => state.username)

  return (
    <>
      <Home.Hero />
      <div id="app" className="relative">
        {username ? (
          <Home.Network username={username} />
        ) : (
          <>
            <Home.Register />
            <Home.Footer />
          </>
        )}
      </div>
    </>
  )
}
