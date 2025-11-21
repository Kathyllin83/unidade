"use client"; // MUITO IMPORTANTE: Esta é uma página do lado do cliente

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Importa o cliente que acabamos de criar
import { useRouter } from "next/navigation";
import { Home, Info, Users, BookOpen } from "lucide-react"; // Ícones

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      console.error("Erro no login:", error.message);
    } else if (data.user) {
      // Sucesso! Redireciona para a página inicial
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Fixo (sticky) - Idêntico ao da Home, mas com ícones */}
      <header className="sticky top-0 z-10 w-full bg-white shadow-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <a href="/ " className="flex items-center">
            <img src="/logo.png" alt="Logo Unidade" className="h-8 w-auto" />
          </a>

          {/* AJUSTE: Adicionando ícones como na sua imagem de login */}
          <div className="flex items-center space-x-6">
        <a
              href="/ "
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <Home className="w-4 h-4 mr-1.5" />
              Início
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <Info className="w-4 h-4 mr-1.5" />
              Sobre
            </a>
            <a
              href="/login/login.tsx"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Acessar
            </a>
          </div>
        </nav>
      </header>

      {/* Conteúdo da Página de Login */}
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex">
          {/* Coluna da Esquerda: Formulário */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <div className="flex justify-start mb-6">
              {/* Ícone de "pessoas" como na imagem */}
              <Users className="w-10 h-10 text-blue-600" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Acesse sua conta
            </h2>
            <p className="text-gray-600 mb-6">Bem-vindo de volta!</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>

          {/* Coluna da Direita: Ilustração */}
          <div className="hidden lg:flex w-1/2 bg-amber-50 items-center justify-center p-12">
            <div className="text-center">
              {/* Usando um placeholder para a imagem do professor */}
              <img
                src="https://placehold.co/300x400/FFF0D9/333333?text=Ilustra%C3%A7%C3%A3o\Professor"
                alt="Professor"
                className="rounded-lg mb-6"
              />
              <button
                type="button"
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Acessar como professor
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
