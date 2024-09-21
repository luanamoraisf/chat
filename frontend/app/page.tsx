"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-4xl font-serif mt-28">Olá, seja bem-vindo ao Chat
      </p>
      <button onClick={handleRedirect} className="bg-violet-500 border-8 border-violet-500 hover:shadow-2xl hover:shadow-violet-900/50 rounded-lg text-4xl text-white mb-96 border-spacing-7">Entrar</button>
    </main>
  );
}
