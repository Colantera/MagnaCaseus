import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Sparkles, Wheat, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheeseCard } from "@/components/CheeseCard";
import { CheeseFilters, DEFAULT_FILTERS, FilterState } from "@/components/CheeseFilters";
import { useCheeses } from "@/hooks/useCheeses";
import heroImage from "@/assets/hero-cheese.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magna Caseus — Catálogo de Queijos Nobres" },
      {
        name: "description",
        content:
          "Explore nossa curadoria de queijos artesanais nobres. Filtros por tipo, preço, sem lactose e sem glúten.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data, loading } = useCheeses();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return data.filter((c) => {
      if (filters.type !== "Todos" && c.type !== filters.type) return false;
      if (c.price > filters.maxPrice) return false;
      if (filters.lactoseFree && !c.lactoseFree) return false;
      if (filters.glutenFree && !c.glutenFree) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.origin.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [data, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Tábua de queijos artesanais"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-walnut/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Curadoria artesanal
            </span>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] text-cream md:text-7xl">
              Queijos nobres,{" "}
              <span className="italic text-gold">acessíveis</span> a todos.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
              Uma seleção dos queijos mais celebrados do mundo — incluindo opções sem
              lactose e sem glúten — para que ninguém fique de fora da experiência
              gourmet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-medium text-walnut shadow-elegant transition-transform hover:-translate-y-0.5"
              >
                Explorar catálogo
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/sobre"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-6 py-3 font-medium text-cream backdrop-blur-sm transition-colors hover:bg-cream/20"
              >
                Nossa história
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
          {[
            {
              icon: Wheat,
              title: "Origens autênticas",
              text: "Direto de produtores tradicionais da Itália, França, Espanha, Suíça e Brasil.",
            },
            {
              icon: ShieldCheck,
              title: "Para todas as dietas",
              text: "Filtre por sem lactose e sem glúten — refinamento sem restrições.",
            },
            {
              icon: Sparkles,
              title: "Curadoria gourmet",
              text: "Cada queijo selecionado por mestres queijeiros e degustadores.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15">
                <Icon className="h-5 w-5 text-gold-deep" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section id="catalogo" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              Catálogo
            </span>
            <h2 className="mt-2 font-serif text-4xl font-semibold">
              Nossa seleção atual
            </h2>
          </div>
          <span className="hidden text-sm text-muted-foreground md:block">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <CheeseFilters filters={filters} onChange={setFilters} />

          <div>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-xl bg-muted"
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-16 text-center">
                <p className="font-serif text-xl">Nenhum queijo encontrado</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tente ajustar os filtros para ampliar a busca.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c) => (
                  <CheeseCard key={c.id} cheese={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
