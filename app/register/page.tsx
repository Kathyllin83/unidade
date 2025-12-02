"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [matricula, setMatricula] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // 🔥 Registro no Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          matricula, // ⬅️ SALVANDO A MATRÍCULA
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Área do formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-10 lg:p-20">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-800">
          Criar Conta
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4 w-full max-w-md bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-xl"
        >
          <div>
            <label className="block mb-1 text-sm font-semibold text-blue-900">
              Nome Completo
            </label>
            <input
              type="text"
              className="w-full border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-blue-900">
              Matrícula do Aluno
            </label>
            <input
              type="text"
              className="w-full border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: 20241023"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-blue-900">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-blue-900">
              Senha
            </label>
            <input
              type="password"
              className="w-full border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Criando conta..." : "Registrar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-800">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-blue-700 font-semibold underline">
            Entrar
          </Link>
        </p>
      </div>

      {/* Imagem lateral */}
      <div className="hidden lg:flex w-1/2 bg-blue-200 items-center justify-center shadow-inner">
        <img
          src="/img/register.png"
          alt="Registro"
          className="w-4/5 drop-shadow-2xl rounded-2xl"
        />
      </div>
    </div>
  );
}
