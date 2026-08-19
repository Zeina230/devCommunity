import React from 'react'
export const revalidate = 60
 type comProps ={
    params: Promise<{slug:string}>
 }
const page = async ({params}: comProps) => {
  const blogsResponse= await fetch(`${process.env.AUTH_URL}/api/blogs`)
    
  const blogs = await blogsResponse.json();
  const { slug } = await params;
  const blog = blogs.find((item: { slug: string }) => item.slug === slug);
  if(!blog)
  {
    return(
      <section className="space-y-6">
        <h1 className="text-2xl font-bold"> Blog Not Found.</h1>
        <p className="text-gray-600">The blog you are looking for does not exist.</p>
      </section>
    )
  }
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="text-xl">{blog.content}</p>
      <p className="text-gray-600">Category: {blog.category}</p>
      <p className="text-gray-600">Author: {blog.author}</p>
    </section>
  )
}

export default page