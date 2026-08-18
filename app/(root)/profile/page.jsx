import { auth } from "@/auth";
import Blog from "@/models/blog";
import Community from "@/models/community";
import User from "@/models/users";
import { redirect } from "next/navigation";
import React from "react";
import { updateProfileAction } from "@/components/updateProfile";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await User.findOne({
    email: session.user.email,
  }).lean();

  if (!user) {
    redirect("/login");
  }
  const blogs = await Blog.find({
  author: user._id,})  .lean();

  const communities = await Community.find({
    members: user._id,
  })

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="mb-10 rounded-xl border p-6">
        <div className="flex items-center gap-6">
          {session.user?.image && (
            <img src={session.user.image}
              alt="Profile" width={100} height={100} className="rounded-full"/>)}
        </div>

        <form action={updateProfileAction} className="mt-6">
          <div className="mb-4 flex gap-3">
            <label className="font-bold underline">
              Name:
            </label>
            <input type="text" name="name" defaultValue={user.name || ""} required className="rounded border px-2"/>
          </div>
          <div className="mb-4 flex gap-3">
            <label className="font-bold underline">Bio:</label>
            <input type="text" name="bio" defaultValue={user.bio || ""} className="rounded border px-2"/>
          </div>
          <button type="submit" className="rounded border bg-gray-500 px-3 py-1">Update Profile</button>
        </form>
        <p>Email: {user.email}</p>
<p>
  Joined:{user.createdAt ? new Date(user.createdAt).toLocaleDateString()
    : "Unknown"}
</p>
      </div>
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">
          Created Blogs</h2>
 {blogs.length === 0 ? (
          <div className="rounded-xl border p-6">
            <p className="text-gray-500">
              You haven't created any blogs yet.
            </p>
          </div>
        ):(
          <div className="grid gap-4 md:grid-cols-2">
            {blogs.map((blog) => (
              <div key={blog._id.toString()} className="rounded-xl border p-5">
                <h3 className="mb-2 text-xl font-bold">
                  {blog.title}
                </h3>
                  <p className="mb-3 text-gray-600">
                    {blog.content}
                  </p>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mb-10">

        <h2 className="mb-4 text-2xl font-bold">
          Communities
        </h2>

        {communities.length === 0 ? (
          <div className="rounded-xl border p-6">
            <p className="text-gray-500">
              You haven't joined any communities yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {communities.map((community) => (
              <div key={community._id.toString()} className="rounded-xl border p-5">
                <h3 className="mb-2 text-xl font-bold">
                  {community.name}</h3>
                <p className="mb-3 text-gray-600">{community.description} </p>
                <p className="text-sm text-gray-500">Members: {community.members.length}</p>
              </div>
            ))}
          </div>
        )}
        </section>
    </div>
  );
};

export default page;