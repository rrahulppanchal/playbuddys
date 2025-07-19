import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "../model";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(params) {
      const { user } = params;
      try {
        await dbConnect();
        await User.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          },
          { upsert: true, new: true }
        );
        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false;
      }
    },
  },
}; 