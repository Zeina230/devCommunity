import Link from 'next/link'
import React from 'react'
 type d = {
    slug:string,
    title:string, 
    content:string,
    author:string,
    category:string,
    isPublished:Boolean,
    createdAt:Date,
 }
const BlogsCard = (props: d) => {
  return (
    <div className="border rounded-xl p-4 space-y-2">
                    <h1 className="text-xl font-semibold">{props.title}</h1>
                    <h1 className="text-xl text-gray-700">{props.content}</h1>
                    <p className="text-sm text-gray-500">By:{props.author}</p>
                    <p className="text-sm text-gray-500">{props.category}</p>
                    <Link href={`/blogs/${props.slug}`} className="text-blue-400 hover:underline">View blog</Link>
    </div>
  )
}

export default BlogsCard