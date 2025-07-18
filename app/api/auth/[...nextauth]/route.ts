import dbConnect from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await dbConnect();

            // Upsert user (insert if not exists, update if exists)
            console.log(user);
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
        }
    }
});

export { handler as GET, handler as POST };