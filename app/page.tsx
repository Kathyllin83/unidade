import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import CategoryClient from "./CategoryClient";

type Event = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  category: string | null;
};

async function getEvents() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials missing");
    return {
      featuredEvents: [],
      categoryEvents: [],
      categories: [
        "Festividades",
        "Eventos Esportivos",
        "Palestras e Oficinas",
        "Feira de Ciências",
        "Semana da Matemática",
      ],
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: featuredEvents } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", true);

  const { data: categoryEvents } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", false);

  const categories = [
    "Festividades",
    "Eventos Esportivos",
    "Palestras e Oficinas",
    "Feira de Ciências",
    "Semana da Matemática",
  ];

  return {
    featuredEvents: (featuredEvents || []) as Event[],
    categoryEvents: (categoryEvents || []) as Event[],
    categories,
  };
}

const categoryImages: Record<string, string> = {
  Festividades: "/img/evento1.png",
  "Eventos Esportivos": "/img/evento2.jpg",
  "Palestras e Oficinas": "/img/evento3.png",
  "Feira de Ciências": "/img/evento4.png",
  "Semana da Matemática": "/img/evento1.png",
};

export default async function HomePage() {
  const { categoryEvents, categories } = await getEvents();

  const featuredImages = [
    { id: "img1", path: "/img/img1.png", title: "Evento 1" },
    { id: "img2", path: "/img/img2.png", title: "Evento 2" },
    { id: "img3", path: "/img/img3.png", title: "Evento 3" },
    { id: "img4", path: "/img/img4.png", title: "Evento 4" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="sticky top-0 z-10 w-full bg-white shadow-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/img/logo.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
          </Link>

          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Início
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Sobre
            </a>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Acessar
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-12">
        {/* DESTAQUES */}
        <section className="mb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Destaques</h2>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel opts={{ align: "center", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {featuredImages.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="pl-4 md:basis-3/5 lg:basis-1/2"
                  >
                    <div className="p-1">
                      <div
                        className="h-64 lg:h-80 rounded-xl bg-cover bg-center shadow-lg"
                        style={{ backgroundImage: `url(${image.path})` }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* CLIENT COMPONENT = FILTROS + LISTAGEM */}
        <CategoryClient
          events={categoryEvents}
          categories={categories}
          categoryImages={categoryImages}
        />
      </main>
    </div>
  );
}
