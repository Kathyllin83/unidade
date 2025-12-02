"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("Email ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/calendario");
  }

  return (
    <div className="flex min-h-screen">
      {/* LADO ESQUERDO — FORMULÁRIO */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 py-16">
        <h1 className="text-3xl font-bold mb-4">Entrar</h1>
        <p className="text-gray-600 mb-8">Acesse sua conta para continuar.</p>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 w-full max-w-md"
        >
          {/* INPUT EMAIL */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 
                         focus:bg-white focus:border-black outline-none"
            />
          </div>

          {/* INPUT SENHA */}
          <div>
            <label className="block mb-1 text-sm font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 
                         focus:bg-white focus:border-black outline-none"
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          {/* BOTÃO ENTRAR */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-xl 
                       hover:bg-yellow-500 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* LINK CRIAR CONTA */}
          <Link
            href="/register"
            className="w-full py-3 border border-gray-300 text-black rounded-xl 
                       text-center font-semibold hover:bg-gray-100 transition"
          >
            Criar conta
          </Link>

          <p className="text-sm text-gray-500 text-center">
            Esqueceu a senha?{" "}
            <Link href="/recover" className="text-blue-600 hover:underline">
              Recupere
            </Link>
          </p>
        </form>
      </div>

      {/* LADO DIREITO — IMAGEM */}
      <div className="hidden lg:flex w-1/2 bg-amber-100 items-center justify-center p-12">
        <div className="text-center">
          <Image
            src="/img/register.png"
            alt="Responsável"
            width={200}
            height={200}
            className="rounded-xl shadow-lg object-cover"
          />
          <button
            type="button"
            className="mt-6 py-3 px-8 bg-white text-gray-800 font-medium 
                       rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            Acessar como responsável
          </button>
        </div>
      </div>
    </div>
  );
}
