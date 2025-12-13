import React from "react";

export default function SobrePage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <div className="bg-white/90 rounded-2xl shadow-xl p-10 max-w-2xl w-full border border-blue-100">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center drop-shadow">Sobre o Projeto</h1>
        <p className="mb-4 text-lg text-gray-700 text-center">
          Este sistema faz parte de um projeto desenvolvido pelos alunos Kathyllin, Joana, David e Geovanny, com o objetivo de facilitar a gestão escolar e o acompanhamento de eventos, notas e faltas pelos alunos.
        </p>
        <div className="flex flex-col items-center my-6">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-base shadow-sm mb-2">
            Projeto dos alunos: Kathyllin, Joana, David e Geovanny
          </span>
          <span className="text-gray-500 text-sm">Versão 1.0.0 - 2025</span>
        </div>
        <p className="text-center text-gray-600 mt-6">
          Desenvolvido com dedicação para a comunidade escolar.<br/>
          <span className="italic">Todos os direitos reservados.</span>
        </p>
      </div>
    </main>
  );
}
