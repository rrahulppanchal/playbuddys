import dbConnect from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../model";
import type { AuthOptions } from "next-auth";
import type { Account, Profile, User as AuthUser } from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };