import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface FavoritesContextValue {
  favorites: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const KEY = "magna-caseus:favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setFavorites(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  const persist = (next: string[]) => {
    setFavorites(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const toggle = (id: string) => {
    persist(favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]);
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  return ctx;
}
