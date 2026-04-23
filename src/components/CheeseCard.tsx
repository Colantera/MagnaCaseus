import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { Cheese } from "@/services/api";
import { useFavorites } from "@/contexts/FavoritesContext";

export function CheeseCard({ cheese }: { cheese: Cheese }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(cheese.id);

  return (
    <Link
      to="/queijo/$id"
      params={{ id: cheese.id }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={cheese.image}
          alt={cheese.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggle(cheese.id);
          }}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-card backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              fav ? "fill-gold text-gold" : "text-foreground/60"
            }`}
          />
        </button>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-walnut/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-cream backdrop-blur-sm">
            {cheese.type}
          </span>
          {cheese.lactoseFree && (
            <span className="rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-walnut">
              Sem Lactose
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {cheese.origin}
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
          {cheese.name}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="font-medium text-foreground">{cheese.rating.toFixed(1)}</span>
          <span>· {cheese.weight}</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              A partir de
            </div>
            <div className="font-serif text-2xl font-semibold text-foreground">
              R$ {cheese.price.toFixed(2).replace(".", ",")}
            </div>
          </div>
          <span className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors group-hover:border-gold group-hover:bg-gold/10">
            Ver mais →
          </span>
        </div>
      </div>
    </Link>
  );
}
