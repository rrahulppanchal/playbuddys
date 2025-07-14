import { LoginForm } from "@/components/auth/login-form"
import { GalleryVerticalEnd } from "lucide-react"
import Image from 'next/image';
import img from '../../../assets/img/logo.png';
import { Suspense } from "react";



export default function LoginPage() {
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
                <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm />
                </Suspense>
                </div>
            </div>
        </div>
    )
}
