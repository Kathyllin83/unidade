"use client";

import { useState } from "react";

type Event = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  category: string | null;
};

export default function CategoryClient({
  events,
  categories,
  categoryImages,
}: {
  events: Event[];
  categories: string[];
  categoryImages: Record<string, string>;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents =
    selectedCategory === "Todos"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="text-3xl font-bold mb-6 text-center">
          Navegue por categoria
        </h2>

        {/* Filtros */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory("Todos")}
            className={`px-6 py-2 rounded-full font-medium border transition 
              ${
                selectedCategory === "Todos"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
          >
            Todos
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium border transition 
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-blue-600 border-blue-600 hover:bg-blue-50"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {filteredEvents.map((event) => {
            const localImage = categoryImages[event.category ?? ""] ?? null;

            return (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={
                    localImage ||
                    event.image_url ||
                    "https://via.placeholder.com/400x200.png?text=Evento"
                  }
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL DE DETALHES */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>

            <img
              src={
                categoryImages[selectedEvent.category ?? ""] ||
                selectedEvent.image_url ||
                "/img/default.png"
              }
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>

            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>

            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {selectedEvent.category}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
