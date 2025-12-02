"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CalendarioPage() {
  const supabase = createClientComponentClient();

  const [userName, setUserName] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const legendas = [
    { cor: "bg-red-500", titulo: "Avaliações" },
    { cor: "bg-blue-500", titulo: "Atividades" },
    { cor: "bg-green-500", titulo: "Reunião Pedagógica" },
  ];

  const eventos = [
    { dia: 10, tipo: "Avaliações" },
    { dia: 11, tipo: "Avaliações" },
    { dia: 12, tipo: "Avaliações" },
    { dia: 13, tipo: "Avaliações" },
    { dia: 14, tipo: "Avaliações" },
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

  const ano = currentDate.getFullYear();
  const mes = currentDate.toLocaleString("pt-BR", { month: "long" });
  const primeiroDia = new Date(ano, currentDate.getMonth(), 1).getDay();
  const diasNoMes = new Date(ano, currentDate.getMonth() + 1, 0).getDate();

  const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

  function mudarMes(offset: number) {
    setCurrentDate(new Date(ano, currentDate.getMonth() + offset, 1));
  }

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
          <button className="bg-[#1CA0C6] p-3 rounded-lg text-left font-semibold w-full">
            Calendário
          </button>
        </Link>

        <Link href="/faltas">
          <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
            Faltas
          </button>
        </Link>

        <Link href="/notas">
          <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
            Notas
          </button>
        </Link>

        <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
          Quadro de Horários
        </button>

        <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
          Opção
        </button>

        <div className="mt-6">
          <h2 className="text-sm uppercase opacity-80">Central do aluno</h2>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Calendário: 202X</h1>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <span>
              Olá, <strong>{userName}</strong>
            </span>
          </div>
        </div>

        {/* Legendas */}
        <div className="flex gap-8 mb-10">
          {legendas.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.cor}`}></span>
              <span className="text-sm">{item.titulo}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold capitalize">
            {mes} {ano}
          </h2>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <button onClick={() => mudarMes(-1)}>&lt; mês anterior</button>
          <button onClick={() => mudarMes(1)}>próximo mês &gt;</button>
        </div>

        <div className="grid grid-cols-7 border text-center bg-white shadow rounded-lg overflow-hidden">
          {diasSemana.map((d) => (
            <div key={d} className="py-3 font-semibold border-b bg-gray-50">
              {d}
            </div>
          ))}

          {Array((primeiroDia + 6) % 7)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border h-24"></div>
            ))}

          {Array(diasNoMes)
            .fill(0)
            .map((_, i) => {
              const dia = i + 1;
              const eventosDia = eventos.filter((ev) => ev.dia === dia);

              return (
                <div
                  key={dia}
                  className="border h-24 relative p-2 text-gray-600"
                >
                  {dia}

                  <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                    {eventosDia.map((ev, idx) => {
                      const legenda = legendas.find(
                        (l) => l.titulo === ev.tipo
                      );
                      return (
                        <span
                          key={idx}
                          className={`w-3 h-3 rounded-full ${
                            legenda?.cor || "bg-gray-400"
                          }`}
                        ></span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
}
