"use client"
import Image from 'next/image';
import img from '../../../assets/img/logo.png';
import { RegisterForm } from "@/components/auth/register-form";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";



export default function LoginPage() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Loading...</span>
            </div>
        );
    }

    if (session) {
        redirect("/");
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex items-center flex-col gap-2 self-center font-medium">
                    <Image
                        src={img}
                        alt="User profile photo"
                        width={220}
                        height={220}
                        quality={80}
                    />
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
