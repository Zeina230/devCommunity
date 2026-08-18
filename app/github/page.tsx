import { auth ,signIn, signOut} from '@/auth'
import React from 'react'

const page = async () => {
    const session = await auth(); //session have all info of the user from github
  return (
    <div className="p-[50px]">
        <h1 className="text border-bold">Github Auth Test Page</h1>
        {session?(     //Is the user signed in?
            <div>
                <h1>Welcome, {session.user?.name}!</h1> 
                <img src={session.user?.image || ' ' } alt="" width={80} height={80} />
                <p>{session?.user?.email}</p>
                <form action={async () => {"use server"; await signOut()}} >
                    <button type="submit"  className="bg-blue-600 text-white p-3">Sign Out</button>
                </form>
            </div>
            ):(
            <div>
                <p className="text-3xl font-bold">You Are Not Signed In!</p>
                <form action={async () => {"use server"; await signIn("github")}} >
                    <button type="submit" className="bg-blue-600 text-white p-3">Sign In With Github</button>
                </form>
            </div>)
        }
    </div>
    
  )
}

export default page