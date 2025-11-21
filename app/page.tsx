import { createClient } from "@supabase/supabase-js";

// Importe os novos componentes do Carrossel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; // Caminho gerado pelo shadcn/ui

// --- ESTA PARTE É O "BACKEND" ---
// (Sem alterações aqui, continua igual)

type Event = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  category: string | null;
};

async function getEvents() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Nota: Nós ainda buscamos featuredEvents aqui, mas não vamos usá-los no carrossel.
  const { data: featuredEvents, error: featuredError } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", true);

  const { data: categoryEvents, error: categoryError } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", false);

  const categories = [
    "Festividades",
    "Eventos Esportivos",
    "Palestras e Oficcinas",
    "Feira de Ciências",
  ];

  if (featuredError || categoryError) {
    console.error("Erro ao buscar dados:", featuredError || categoryError);
    return { featuredEvents: [], categoryEvents: [], categories: [] };
  }

  return {
    featuredEvents: (featuredEvents || []) as Event[],
    categoryEvents: (categoryEvents || []) as Event[],
    categories,
  };
}

// --- ESTA PARTE É O "FRONTEND" (Com o novo Carrossel) ---

export default async function HomePage() {
  // Nós ainda pegamos os dados, mas só usaremos categoryEvents e categories
  const { categoryEvents, categories } = await getEvents();

  // ==========================================================
  // AJUSTE: Array de imagens locais da pasta /public
  // MUDE A EXTENSÃO (.png, .jpg) SE NECESSÁRIO!
  // ==========================================================
  const featuredImages = [
    { id: "img1", path: "img/img1.png", title: "Evento 1" },
    { id: "img2", path: "img/img2.png", title: "Evento 2" },
    { id: "img3", path: "img/img3.png", title: "Evento 3" },
    { id: "img4", path: "img/img4.png", title: "Evento 4" },
  ];
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Fixo (sticky) */}
      <header className="sticky top-0 z-10 w-full bg-white shadow-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* ========================================================== */}
          {/* AJUSTE: Trocando o texto "unidade" pela logo.png */}
          {/* ========================================================== */}
          <a href="/ " className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo Unidade"
              className="h-8 w-auto" // h-8 = 2rem = 32px. Ajuste a altura se necessário.
            />
          </a>
          {/* ========================================================== */}

          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Início
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Sobre
            </a>
            <a
              href=""
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Acessar
            </a>
          </div>
        </nav>
      </header>

      {/* Conteúdo da Página Principal */}
      <main className="py-12">
        {/* ========================================================== */}
        {/* AJUSTE: Seção Destaques agora usa o array local 'featuredImages' */}
        {/* ========================================================== */}

        <section className="mb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Destaques</h2>
          </div>

          {/* AJUSTE: Removido o 'relative' daqui */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* AJUSTE: As duas 'div's de gradiente que estavam aqui
              foram REMOVIDAS.
            */}

            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {/* MUDANÇA AQUI: Trocamos 'featuredEvents.map' por 'featuredImages.map' */}
                {featuredImages.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="pl-4 md:basis-3/5 lg:basis-1/2"
                  >
                    <div className="p-1">
                      <div
                        className="h-64 lg:h-80 rounded-xl bg-cover bg-center shadow-lg"
                        // MUDANÇA AQUI: Usamos 'image.path'
                        style={{ backgroundImage: `url(${image.path})` }}
                        title={image.title}
                      >
                        {/* Imagem do evento */}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* AJUSTE: Removido o 'z-20' */}
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* ========================================================== */}
        {/* O restante da página continua igual e usa Supabase */}
        {/* ========================================================== */}

        <section className="mb-16 container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Navegue por categoria
          </h2>
          <div className="flex justify-center flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ESTA PARTE AINDA USA O SUPABASE */}
            {categoryEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={
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
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
