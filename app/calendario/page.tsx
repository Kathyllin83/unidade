"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CalendarioPage() {
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

  const ano = currentDate.getFullYear();
  const mes = currentDate.toLocaleString("pt-BR", { month: "long" });
  const primeiroDia = new Date(ano, currentDate.getMonth(), 1).getDay();
  const diasNoMes = new Date(ano, currentDate.getMonth() + 1, 0).getDate();

  const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

  function mudarMes(offset: number) {
    setCurrentDate(new Date(ano, currentDate.getMonth() + offset, 1));
  }

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
              <button className="bg-[#1CA0C6] p-2.5 sm:p-3 rounded-lg text-left font-semibold w-full text-sm sm:text-base">
                Calendário
              </button>
            </Link>

            <Link href="/faltas">
              <button className="bg-[#2F8AAA] p-2.5 sm:p-3 rounded-lg text-left w-full text-sm sm:text-base hover:bg-[#1CA0C6] transition-colors">
                Faltas
              </button>
            </Link>

            <Link href="/notas">
              <button className="bg-[#2F8AAA] p-2.5 sm:p-3 rounded-lg text-left w-full text-sm sm:text-base hover:bg-[#1CA0C6] transition-colors">
                Notas
              </button>
            </Link>

            <button className="bg-[#2F8AAA] p-2.5 sm:p-3 rounded-lg text-left w-full text-sm sm:text-base hover:bg-[#1CA0C6] transition-colors">
              Quadro de Horários
            </button>

            <button className="bg-[#2F8AAA] p-2.5 sm:p-3 rounded-lg text-left w-full text-sm sm:text-base hover:bg-[#1CA0C6] transition-colors">
              Opção
            </button>
          </div>

          <div className="mt-3 lg:mt-6 hidden lg:block">
            <h2 className="text-xs sm:text-sm uppercase opacity-80">
              Central do aluno
            </h2>
          </div>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold">Calendário: {ano}</h1>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-300 rounded-full"></div>
            <span className="text-sm sm:text-base">
              Olá, <strong>{userName}</strong>
            </span>
          </div>
        </div>

        {/* Legendas */}
        <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-10">
          {legendas.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.cor}`}></span>
              <span className="text-xs sm:text-sm">{item.titulo}</span>
            </div>
          ))}
        </div>

        {/* Mês/Ano */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold capitalize">
            {mes} {ano}
          </h2>
        </div>

        {/* Navegação de mês */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-2">
          <button
            onClick={() => mudarMes(-1)}
            className="px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            &lt; Anterior
          </button>
          <button
            onClick={() => mudarMes(1)}
            className="px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Próximo &gt;
          </button>
        </div>

        {/* Calendário */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 text-center">
            {/* Cabeçalho dos dias */}
            {diasSemana.map((d) => (
              <div
                key={d}
                className="py-2 sm:py-3 font-semibold border-b bg-gray-50 text-[10px] sm:text-xs lg:text-sm"
              >
                {d}
              </div>
            ))}

            {/* Dias vazios antes do início do mês */}
            {Array((primeiroDia + 6) % 7)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border-r border-b h-12 sm:h-16 lg:h-24 bg-gray-50"
                ></div>
              ))}

            {/* Dias do mês */}
            {Array(diasNoMes)
              .fill(0)
              .map((_, i) => {
                const dia = i + 1;
                const eventosDia = eventos.filter((ev) => ev.dia === dia);

                return (
                  <div
                    key={dia}
                    className="border-r border-b h-12 sm:h-16 lg:h-24 relative p-1 sm:p-2 text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm lg:text-base font-medium">
                      {dia}
                    </span>

                    {/* Indicadores de eventos */}
                    {eventosDia.length > 0 && (
                      <div className="absolute bottom-1 sm:bottom-2 left-1/2 flex -translate-x-1/2 gap-0.5 sm:gap-1">
                        {eventosDia.map((ev, idx) => {
                          const legenda = legendas.find(
                            (l) => l.titulo === ev.tipo
                          );
                          return (
                            <span
                              key={idx}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full ${
                                legenda?.cor || "bg-gray-400"
                              }`}
                              title={ev.tipo}
                            ></span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Rodapé mobile com informações */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg lg:hidden">
          <p className="text-xs text-gray-600 text-center">
            Toque em um dia para ver os eventos
          </p>
        </div>
      </main>
    </div>
  );
}
