"use server";

import connectDB from "@/lib/db";
import Community from "@/models/community";
import User from "@/models/users";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function joinCommunityAction(slug: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("You must be logged in");
  }

  await connectDB();

  const user = await User.findOne({
    email: session.user.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const community = await Community.findOne({ slug });

  if (!community) {
    throw new Error("Community not found");
  }

 
  if (!Array.isArray(community.members)) {
    community.members = [];
  }

  const alreadyMember = community.members.some(
    (member: any) =>
      member.toString() === user._id.toString()
  );

  if (!alreadyMember) {
    community.members.push(user._id);
    await community.save();
  }

  revalidatePath("/communities");
  revalidatePath("/profile");
}

export async function leaveCommunityAction(slug: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("You must be logged in");
  }

  await connectDB();

  const user = await User.findOne({
    email: session.user.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const community = await Community.findOne({ slug });

  if (!community) {
    throw new Error("Community not found");
  }

  if (!Array.isArray(community.members)) {
    community.members = [];
  }

  community.members = community.members.filter(
    (member: any) =>
      member.toString() !== user._id.toString()
  );

  await community.save();

  revalidatePath("/communities");
  revalidatePath("/profile");
}