import { Home } from '@/components/HomePage'

export default function HomePage() {
  return (
    <div className="max-w-[80rem] mx-auto">
      <Home.Hero />
      <Home.Register />
    </div>
  )
}
