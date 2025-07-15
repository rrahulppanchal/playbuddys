import dbConnect from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // const { db } = await dbConnect();
            console.log(user, account, profile)

            // // Upsert user (insert if not exists, update if exists)
            // await db.collection("users").updateOne(
            //     { email: user.email },
            //     {
            //         $set: {
            //             name: user.name,
            //             email: user.email,
            //             image: user.image,
            //             // add other fields as needed
            //         },
            //     },
            //     { upsert: true }
            // );

            return true;
        }
    }
});

export { handler as GET, handler as POST };