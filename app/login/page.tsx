"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.push("/"); // redireciona para home
  }

  return (
    <div className="flex min-h-screen">
      {/* Coluna esquerda: formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 py-16">
        <h1 className="text-3xl font-bold mb-4">Entrar</h1>
        <p className="text-gray-600 mb-8">Acesse sua conta para continuar.</p>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 w-full max-w-md"
        >
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 focus:bg-white focus:border-black outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 focus:bg-white focus:border-black outline-none"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-xl hover:bg-yellow-500 transition"
          >
            Entrar
          </button>

          <Link
            href="/register"
            className="w-full py-3 border border-gray-300 text-black rounded-xl text-center font-semibold hover:bg-gray-100 transition"
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

      <div className="hidden lg:flex w-1/2 bg-amber-50 items-center justify-center p-12">
        <div className="text-center">
          <img
            src="img/login.png" 
            alt="Professor"
            className="rounded-xl shadow-lg w-[200px] h-[200px] object-cover"
          />
          <button
            type="button"
            className="mt-6 py-3 px-8 bg-white text-gray-800 font-medium rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            Acessar como professor
          </button>
        </div>
      </div>
    </div>
  );
}
