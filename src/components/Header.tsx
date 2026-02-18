import { Link } from "@tanstack/react-router"

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <Link to="/">
          <h2 className="text-xl font-bold">Traveller Dashboard</h2>
        </Link>
      </header>
    </>
  )
}
