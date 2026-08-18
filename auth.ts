import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import connectDB from "@/lib/db";
import User from "@/models/users";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          const username =
            user.name?.toLowerCase().replace(/\s+/g, "") ||
            user.email?.split("@")[0];

          await User.create({
            username,
            name: user.name || username,
            email: user.email,
            image: user.image,
          });
        }

        return true;
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }
    },
  },
})