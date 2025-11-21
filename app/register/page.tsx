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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // 🔥 Registro no Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // salva o nome no perfil do usuário
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // Sucesso → redireciona
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Área do formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-20">
        <h1 className="text-3xl font-bold mb-6">Criar Conta</h1>

        <form onSubmit={handleRegister} className="space-y-4 w-full max-w-md">
          <div>
            <label className="block mb-1 text-sm font-medium">Nome</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Senha</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded"
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Criando conta..." : "Registrar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-700">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Entrar
          </Link>
        </p>
      </div>

      {/* Imagem lateral (opcional) */}
      <div className="hidden lg:flex w-1/2 bg-blue-50 items-center justify-center">
        <p className="text-gray-600">Ilustração</p>
      </div>
    </div>
  );
}
