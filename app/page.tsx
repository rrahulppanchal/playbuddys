export default function Home() {
  return (
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
    </div>
  );
}
