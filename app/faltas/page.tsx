"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FaltasPage() {
  const [userName, setUserName] = useState("");

  const faltas = [
    { materia: "Matemática", total: 3, limite: 15 },
    { materia: "Português", total: 2, limite: 15 },
    { materia: "Biologia", total: 5, limite: 15 },
    { materia: "História", total: 1, limite: 15 },
  ];

  useEffect(() => {
    async function loadUser() {
      const supabase = createClientComponentClient();
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

        <button className="bg-[#1CA0C6] p-3 rounded-lg text-left font-semibold w-full">
          Faltas
        </button>

        <Link href="/notas">
          <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
            Notas
          </button>
        </Link>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Faltas do Aluno</h1>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <span>
              Olá, <strong>{userName}</strong>
            </span>
          </div>
        </div>

        <div className="bg-white shadow border border-gray-300 rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#1CA0C6] mb-4">
            Resumo de Faltas
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-3">Matéria</th>
                <th className="py-3">Faltas</th>
                <th className="py-3">Limite</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {faltas.map((f, index) => {
                const perigoso = f.total >= f.limite * 0.5;

                return (
                  <tr key={index} className="border-b text-gray-700">
                    <td className="py-3">{f.materia}</td>
                    <td className="py-3">{f.total}</td>
                    <td className="py-3">{f.limite}</td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-white text-sm ${
                          perigoso ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {perigoso ? "Atenção" : "OK"}
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
