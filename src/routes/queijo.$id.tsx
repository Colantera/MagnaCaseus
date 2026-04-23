import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Star, MapPin, Wheat, Droplet } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCheese } from "@/hooks/useCheeses";
import { useFavorites } from "@/contexts/FavoritesContext";

export const Route = createFileRoute("/queijo/$id")({
  component: CheeseDetail,
});

function CheeseDetail() {
  const { id } = Route.useParams();
  const { data: cheese, loading } = useCheese(id);
  const { isFavorite, toggle } = useFavorites();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-xl bg-muted" />
            <div className="space-y-4">
              <div className="h-6 w-32 animate-pulse rounded bg-muted" />
              <div className="h-12 w-full animate-pulse rounded bg-muted" />
              <div className="h-32 w-full animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cheese) {
    throw notFound();
  }

  const fav = isFavorite(cheese.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao catálogo
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elegant animate-fade-up">
            <img
              src={cheese.image}
              alt={cheese.name}
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-walnut px-3 py-1 text-xs font-medium uppercase tracking-wider text-cream">
                {cheese.type}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-foreground">
                <MapPin className="h-3 w-3" /> {cheese.origin}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              {cheese.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-semibold">{cheese.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">· {cheese.weight}</span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {cheese.description}
            </p>

            <div className="mt-6 rounded-xl border border-border bg-secondary/50 p-5">
              <div className="text-[11px] font-medium uppercase tracking-wider text-gold-deep">
                Harmonização sugerida
              </div>
              <p className="mt-1 font-serif text-base italic">{cheese.pairing}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {cheese.lactoseFree && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-medium text-gold-deep">
                  <Droplet className="h-3.5 w-3.5" /> Sem lactose
                </span>
              )}
              {cheese.glutenFree && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-medium text-gold-deep">
                  <Wheat className="h-3.5 w-3.5" /> Sem glúten
                </span>
              )}
            </div>

            <div className="mt-8 flex items-end justify-between border-t border-border pt-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Preço
                </div>
                <div className="font-serif text-4xl font-semibold text-foreground">
                  R$ {cheese.price.toFixed(2).replace(".", ",")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {cheese.stock} unidades em estoque
                </div>
              </div>
              <button
                onClick={() => toggle(cheese.id)}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium shadow-card transition-all hover:-translate-y-0.5 ${
                  fav
                    ? "bg-gold text-walnut"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <Heart className={`h-4 w-4 ${fav ? "fill-walnut" : ""}`} />
                {fav ? "Favoritado" : "Favoritar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
