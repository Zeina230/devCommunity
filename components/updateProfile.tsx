"use server";

import connectDB from "@/lib/db";
import User from "@/models/users";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  bio: z.string().trim().max(500).optional(),
});

export async function updateProfileAction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const validatedFields = profileSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    throw new Error("Invalid profile data");
  }

  await connectDB();

  await User.findOneAndUpdate(
    { email: session.user.email },
    {
      name: validatedFields.data.name,
      bio: validatedFields.data.bio || "",
    },
    { new: true }
  );

  revalidatePath("/profile");
}