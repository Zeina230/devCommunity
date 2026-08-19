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

  const alreadyJoined = user.communities.some(
    (communityId: any) => communityId.toString() === community._id.toString()
  );

  if (!alreadyJoined) {
    user.communities.push(community._id);
    community.members += 1;

    await user.save();
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

  const joinedIndex = user.communities.findIndex(
    (communityId: any) =>
      communityId.toString() === community._id.toString()
  );

  if (joinedIndex !== -1) {
    user.communities.splice(joinedIndex, 1);

    if (community.members > 0) {
      community.members -= 1;
    }

    await user.save();
    await community.save();
  }

  revalidatePath("/communities");
  revalidatePath("/profile");
}
