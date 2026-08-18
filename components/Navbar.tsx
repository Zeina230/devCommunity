import Link from "next/link"
import { auth, signOut } from "@/auth"

const Navbar = async () => {
  const session = await auth()

  return (
   <header className="border-b border-cyan-200 bg-black/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    
      <div><Link href={"/"} className="text-2xl font-bold">Dev Community Platform</Link></div>
      <div className="flex gap-4">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/communities">Communities</Link>
        <Link href="/blogs">Blogs</Link>
      </div>

      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <Link href="/profile">Profile</Link>

            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit">
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <Link href="/login">
            Login
          </Link>
        )}
      </div>
      </div>
    </nav>
    </header>
  )
}

export default Navbar