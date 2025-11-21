"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/"); // redireciona para página inicial após login
  }

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo com imagem e botão */}
      <div className="hidden lg:flex w-1/2 bg-pink-200 items-center justify-center relative">
        <img
          src="/img/register.png" // coloque aqui o caminho da sua imagem enviada
          alt="Ilustração família"
          className="w-[200px] h-[200px] object-cover"
        />
        <button className="absolute bottom-20 bg-white py-2 px-6 rounded shadow text-gray-800 font-medium hover:bg-gray-100 transition">
          Acessar como responsável
        </button>
      </div>

      {/* Lado direito - formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-20 bg-white">
        <h1 className="text-3xl font-bold mb-6">Entrar</h1>

        <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-right text-sm mt-1 text-blue-600 hover:underline cursor-pointer">
            Esqueceu a senha? Recupere
          </p>
        </form>
      </div>
    </div>
  );
}
