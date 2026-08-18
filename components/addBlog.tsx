import connectDB from "@/lib/db";
import Blog from "@/models/blog";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import User from "@/models/users";

const blogSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  content: z.string().trim().min(1, "Content is required"),
  category: z.string().trim().min(1, "Category is required").max(50),
});

export async function createBlogAction(formData: FormData) {
    "use server";
  const session = await auth();

  if (!session?.user) {
      return "You must be logged in to create a blog";
  }

  const result = blogSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    category: formData.get("category"),
  });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
const user = await User.findOne({
  email: session.user.email,
});

if (!user) {
  return;
}
  await connectDB();
  const baseSlug = result.data.title
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const slug = `${baseSlug}-${Date.now()}`;
    
  await Blog.create({
    title: result.data.title,
    content: result.data.content,
    category: result.data.category,
    slug,
    author: user._id,
    isPublished: false,
  });

  revalidatePath("/blogs");
}