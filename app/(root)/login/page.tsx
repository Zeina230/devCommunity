import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"
import React from "react"

const page = async () => {
  const session = await auth()

  if (session) {
    redirect("/profile")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-8 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to continue
        </p>

        <div className="flex flex-col gap-4">

          
          <form
            action={async () => {
              "use server"
              await signIn("google", {
                redirectTo: "/profile",
              })
            }}
          >
            <button
              type="submit"
              className="w-full rounded-lg border p-3 font-medium hover:bg-gray-100"
            >
              Continue with Google
            </button>
          </form>

          <form
            action={async () => {
              "use server"
              await signIn("github", {
                redirectTo: "/profile",
              })
            }}
          >
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 p-3 font-medium text-white hover:bg-gray-800"
            >
              Continue with GitHub
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default page