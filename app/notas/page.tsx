"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function NotasPage() {
  const supabase = createClientComponentClient();
  const [userName, setUserName] = useState("");

  const notas = [
    { materia: "Matemática", prova1: 7.5, prova2: 8.2, media: 7.85 },
    { materia: "Português", prova1: 8.0, prova2: 9.1, media: 8.55 },
    { materia: "Biologia", prova1: 6.4, prova2: 7.2, media: 6.8 },
    { materia: "História", prova1: 9.5, prova2: 8.9, media: 9.2 },
  ];

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.name || "Usuário");
      }
    }
    loadUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-[#3CA4C8] p-4 text-white flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-4">Menu</h1>

        <Link href="/mural">
          <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
            Mural
          </button>
        </Link>

        <Link href="/calendario">
          <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
            Calendário
          </button>
        </Link>

        <Link href="/faltas">
          <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
            Faltas
          </button>
        </Link>

        <button className="bg-[#1CA0C6] p-3 rounded-lg text-left font-semibold w-full">
          Notas
        </button>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Notas do Aluno</h1>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <span>
              Olá, <strong>{userName}</strong>
            </span>
          </div>
        </div>

        <div className="bg-white shadow border border-gray-300 rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#1CA0C6] mb-4">
            Resumo de Notas
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-3">Matéria</th>
                <th className="py-3">Prova 1</th>
                <th className="py-3">Prova 2</th>
                <th className="py-3">Média</th>
                <th className="py-3">Situação</th>
              </tr>
            </thead>

            <tbody>
              {notas.map((n, index) => {
                const aprovado = n.media >= 7;

                return (
                  <tr key={index} className="border-b text-gray-700">
                    <td className="py-3">{n.materia}</td>
                    <td className="py-3">{n.prova1}</td>
                    <td className="py-3">{n.prova2}</td>
                    <td className="py-3 font-semibold">{n.media.toFixed(1)}</td>

                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-white text-sm ${
                          aprovado ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {aprovado ? "Aprovado" : "Reprovado"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
