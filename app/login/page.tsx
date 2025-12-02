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

    try {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message || "Email ou senha incorretos.");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Sucesso - redireciona
        router.push("/calendario");
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen min-h-[100dvh] bg-white">
      {/* LADO ESQUERDO — FORMULÁRIO */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-20 py-8 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">
          Entrar
        </h1>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Acesse sua conta para continuar.
        </p>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 sm:gap-5 w-full max-w-md"
        >
          {/* INPUT EMAIL */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email..."
              required
              autoComplete="email"
              disabled={loading}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 bg-gray-50 
                         focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         outline-none transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* INPUT SENHA */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
              required
              autoComplete="current-password"
              disabled={loading}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 bg-gray-50 
                         focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         outline-none transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* BOTÃO ENTRAR */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 sm:py-4 bg-yellow-400 text-gray-900 font-semibold rounded-xl 
                       hover:bg-yellow-500 active:bg-yellow-600 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-sm hover:shadow-md text-base sm:text-lg
                       touch-manipulation"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* LINK CRIAR CONTA */}
          <Link
            href="/register"
            className="w-full py-3.5 sm:py-4 border-2 border-gray-300 text-gray-900 rounded-xl 
                       text-center font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors
                       shadow-sm text-base sm:text-lg touch-manipulation"
          >
            Criar conta
          </Link>

          <p className="text-xs sm:text-sm text-gray-500 text-center mt-2">
            Esqueceu a senha?{" "}
            <Link
              href="/recover"
              className="text-blue-600 hover:underline font-medium"
            >
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
