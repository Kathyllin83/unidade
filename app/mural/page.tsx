"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function MuralPage() {
  const supabase = createClientComponentClient();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Reunião Geral",
      description: "Próxima reunião na sexta-feira às 14h.",
      date: "2025-11-20",
    },
    {
      id: 2,
      title: "Documentos Atualizados",
      description: "Os novos documentos foram enviados no e-mail.",
      date: "2025-11-22",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

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

  const handleCreatePost = () => {
    if (!newTitle || !newDesc) return;

    const newPost = {
      id: posts.length + 1,
      title: newTitle,
      description: newDesc,
      date: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewDesc("");
    setOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-60 bg-[#3CA4C8] p-4 text-white flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-4">Menu</h1>

        <Link href="/mural">
          <button className="bg-[#1CA0C6] p-3 rounded-lg text-left font-semibold w-full">
            Mural
          </button>
        </Link>

        <Link href="/calendario">
          <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
            Calendário
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

        <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
          Faltas
        </button>

        <button className="bg-[#2F8AAA] p-3 rounded-lg text-left w-full">
          Notas
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-10">
        {/* Topo com usuário */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Mural</h1>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <span>
              Olá, <strong>{userName}</strong>
            </span>
          </div>
        </div>

        {/* BOTÃO NOVO AVISO */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#1CA0C6] hover:bg-[#1785a5] text-white px-5 py-2 rounded-lg shadow transition"
          >
            + Novo Aviso
          </button>
        </div>

        {/* LISTA DE AVISOS */}
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-[#1CA0C6]">
                  {post.title}
                </h2>
                <p className="text-gray-700 mt-1">{post.description}</p>
                <span className="text-gray-500 text-sm mt-2 block">
                  {new Date(post.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />

            <div className="fixed inset-0 z-50 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white border border-gray-300 shadow-2xl rounded-2xl p-6 w-[90%] max-w-md"
              >
                <h2 className="text-2xl font-bold text-[#1CA0C6] mb-4">
                  Criar novo aviso
                </h2>

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Título"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl"
                  />

                  <textarea
                    placeholder="Descrição"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl h-24"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={handleCreatePost}
                    className="px-4 py-2 rounded-lg bg-[#1CA0C6] hover:bg-[#1785a5] text-white transition"
                  >
                    Criar aviso
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
