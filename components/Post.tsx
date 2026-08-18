import Blog from '@/models/blog';

const Post =async() => {
    const blogsResponse= await fetch("http://localhost:3000/api/blogs", {
      cache: "no-store",
    })
    const communitiesResponse = await fetch("http://localhost:3000/api/communities", {
      cache: "no-store",
    })
  
  const blogs = await blogsResponse.json();
  const communities = await communitiesResponse.json();
  return (
    <section>
      <h2 className="mb-4 text-3xl text-blue-400 font-bold">
          Recent Blogs:
        </h2>
    <div className="grid gap-4 md:grid-cols-2">
          {blogs.map((blog: any) => (
            <div key={blog._id} className="rounded-lg border p-4">
              <h3 className="text-xl text-blue-300 font-semibold">{blog.title}</h3>
              <p className="mt-2">{blog.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                By {blog.author}
              </p>
            </div>
          ))}
        </div>
        <h2 className="mb-4 text-3xl text-blue-400 font-bold">
          Featured Communities:
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {communities.map((community: any) => (
            <div
              key={community._id}
              className="rounded-lg border p-4"
            >
              <h3 className="text-xl text-blue-300 font-semibold">
                {community.name}
              </h3>

              <p className="mt-2">{community.description}</p>

              <p className="mt-2 text-sm text-gray-500">
                {community.members} members
              </p>
            </div>
          ))}
        </div></section>

  )
}

export default Post