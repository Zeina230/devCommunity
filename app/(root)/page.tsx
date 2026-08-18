import Post from '@/components/Post'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = async () => {
    const blogsResponse = await fetch(
  `${process.env.AUTH_URL}/api/blogs`,
  {
    cache: "no-store",
  }
);

const communitiesResponse = await fetch(
  `${process.env.AUTH_URL}/api/communities`,
  {
    cache: "no-store",
  }
);
  return (
    <section className="space-y-6">
        <div className="space-y-4">
            <h1 className="text-4xl text-blue-600 font-bold">Join a community of developers.</h1>
        </div>
        <div className="flex gap-4">
        <Link href="/communities" className="rounded-lg bg-blue-300 text-black px-4 py-2">Browse communities</Link>
        <Link href="/blogs" className="rounded-lg bg-blue-300 text-black px-4 py-2">Explore Blogs</Link>
        <Link href="/login" className="rounded-lg bg-blue-300 text-black px-4 py-2">Get Started</Link>
        </div>
        <Suspense fallback={<p>Loading..</p>}><Post /></Suspense>
  
    </section>
  )
}

export default page