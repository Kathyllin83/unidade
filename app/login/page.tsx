"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao fazer login.");
        return;
      }

      alert("Login realizado com sucesso!");

      // redireciona para home
      window.location.href = "/";
    } catch (error) {
      alert("Erro inesperado. Tente novamente.");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* LADO ESQUERDO - FORM */}
      <div className="w-full lg:w-1/2 px-6 lg:px-24 flex flex-col justify-center py-10">
        <h1 className="text-3xl font-bold mb-6 text-black">Entrar</h1>
        <p className="text-gray-600 mb-8">Acesse sua conta para continuar.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-300 focus:border-black outline-none"
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-300 focus:border-black outline-none"
              placeholder="Sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Entrar
          </button>

          {/* Botão de Criar Conta */}
          <Link
            href="/register"
            className="w-full mt-2 py-3 border border-black text-black rounded-xl font-semibold hover:bg-gray-100 transition text-center block"
          >
            Criar conta
          </Link>
        </form>

        <p className="text-gray-600 text-sm mt-6">
          Esqueceu a senha?{" "}
          <Link
            href="/recover"
            className="text-black font-semibold hover:underline"
          >
            Recuperar acesso
          </Link>
        </p>
      </div>

      {/* LADO DIREITO - ILUSTRAÇÃO */}
      <div className="hidden lg:flex w-1/2 bg-amber-50 items-center justify-center p-12">
        <div className="text-center">
          <img
            src="https://placehold.co/300x400/FFF0D9/333333?text=Login"
            alt="Login Ilustração"
            className="rounded-xl shadow-lg w-[300px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
