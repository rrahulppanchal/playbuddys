"use client"
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            We are building the biggest sports community in India.
          </h1>
          <p className="text-lg text-muted-foreground">Stay tuned!</p>
          <p className="text-base">
            Your suggestion matters. Write to us at{" "}
            <a
              href="mailto:info.playbuddys@gmail.com"
              className="underline hover:text-blue-600"
            >
              info.playbuddys@gmail.com
            </a>
          </p>
        </main>
      </div></>
  );
}
