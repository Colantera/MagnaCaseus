import { Link } from "@tanstack/react-router";
import { Heart, User, Wheat } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export function Header() {
  const { isAuthenticated, user } = useAuth();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold shadow-card">
            <Wheat className="h-5 w-5 text-walnut" strokeWidth={2.2} />
          </div>
          <div className="leading-none">
            <div className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Magna Caseus
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Queijos Nobres
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-gold"
          >
            Catálogo
          </Link>
          <Link
            to="/sobre"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-gold"
          >
            Sobre
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-gold"
          >
            Painel
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Favoritos"
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-walnut">
                {favorites.length}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/20"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-card transition-all hover:opacity-90"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
