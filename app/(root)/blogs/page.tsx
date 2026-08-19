import React, { Suspense } from 'react'
import BlogsCard from '@/components/Blogs-Card'
import { createBlogAction } from '@/components/addBlog'
export const revalidate = 60
const page = async () => {
  const blogsResponse= await fetch(`${process.env.AUTH_URL}/api/blogs`)
    
  const blogs = await blogsResponse.json();
  if(blogs.length==0){
    return(<p>No blogs published yet</p>)
  }
  
  return (
    <section className="space-y-6">
      <div className="space-y-6">
        <h1 className="text-3xl text-blue-500 font-bold">Blogs</h1>
        <p className="text-xl text-gray-500">Discover the latest ideas, tutorials, and experiences shared by developers.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
           {blogs.map((blog:any) => (
      <BlogsCard key={blog._id} title={blog.title} content={blog.content} author={blog.author} category={blog.category} createdAt={blog.createdAt} isPublished={blog.isPublished} slug={blog.slug} />
           ))}
        </div>
       
      </div>
      <h1 className="text-3xl font-Bold text-blue-500 underline">Create Blog</h1>

      <form action = {createBlogAction} className="flex gap-4">
        <input className="border"
          type="text"
          name="title"
          placeholder="Blog title"
          required
        />

        <input className="border"
          name="content"
          placeholder="Write your blog..."
          required
        />

        <input className="border"
          type="text"
          name="category"
          placeholder="Blog category"
          required
        />

        <button type="submit" className="border bg-blue-500 text-xl px-3">
          Create Blog
        </button>
      </form>
    </section>
  )
}

export default page