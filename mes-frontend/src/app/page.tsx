import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-12">
      <h1 className="text-6xl">Hello, Interviewers 🙋‍♂️</h1>
      <Link
        href="/dashboard"
        className="px-6 py-4 bg-blue-500 text-white border-2 border-blue-500 rounded-md"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
