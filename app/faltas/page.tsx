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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar - Mobile Menu */}
      <aside className="w-full lg:w-60 bg-[#3CA4C8] p-4 text-white">
        <div className="flex flex-col gap-3">
          <h1 className="text-lg sm:text-xl font-bold mb-2 lg:mb-4">Menu</h1>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
            <Link href="/mural">
              <button className="bg-[#2F8AAA] p-2.5 sm:p-3 rounded-lg text-left w-full text-sm sm:text-base hover:bg-[#1CA0C6] transition-colors">
                Mural
              </button>
            </Link>

            <Link href="/calendario">
              <button className="bg-[#2F8AAA] p-2.5 sm:p-3 rounded-lg text-left w-full text-sm sm:text-base hover:bg-[#1CA0C6] transition-colors">
                Calendário
              </button>
            </Link>

            <button className="bg-[#1CA0C6] p-2.5 sm:p-3 rounded-lg text-left font-semibold w-full text-sm sm:text-base">
              Faltas
            </button>

            <Link href="/notas">
              <button className="bg-[#2F8AAA] p-2.5 sm:p-3 rounded-lg text-left w-full text-sm sm:text-base hover:bg-[#1CA0C6] transition-colors">
                Notas
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl font-bold">Faltas do Aluno</h1>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-300 rounded-full"></div>
            <span className="text-sm sm:text-base">
              Olá, <strong>{userName}</strong>
            </span>
          </div>
        </div>

        <div className="bg-white shadow border border-gray-300 rounded-xl p-4 sm:p-6 overflow-x-auto">
          <h2 className="text-base sm:text-lg font-bold text-[#1CA0C6] mb-4">
            Resumo de Faltas
          </h2>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-2 sm:py-3 px-2 sm:px-0 text-xs sm:text-sm">
                      Matéria
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-0 text-xs sm:text-sm">
                      Faltas
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-0 text-xs sm:text-sm">
                      Limite
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-0 text-xs sm:text-sm">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {faltas.map((f, index) => {
                    const perigoso = f.total >= f.limite * 0.5;
                    const porcentagem = Math.round((f.total / f.limite) * 100);

                    return (
                      <tr key={index} className="border-b text-gray-700">
                        <td className="py-2 sm:py-3 px-2 sm:px-0 text-xs sm:text-sm font-medium">
                          {f.materia}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-0 text-xs sm:text-sm">
                          {f.total}
                          <span className="text-[10px] text-gray-500 ml-1">
                            ({porcentagem}%)
                          </span>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-0 text-xs sm:text-sm">
                          {f.limite}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-0">
                          <span
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-white text-[10px] sm:text-sm inline-block ${
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
          </div>

          {/* Card de resumo mobile */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg lg:hidden">
            <p className="text-xs text-gray-600 text-center">
              <strong>Atenção:</strong> O limite de faltas é 25% do total de
              aulas
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
