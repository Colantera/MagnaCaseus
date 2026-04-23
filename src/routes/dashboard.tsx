import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, LogOut, Upload, User as UserIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheeseCard } from "@/components/CheeseCard";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCheeses } from "@/hooks/useCheeses";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const { favorites } = useFavorites();
  const { data: cheeses } = useCheeses();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setPreview(user?.avatar ?? null);
  }, [user]);

  if (!user) return null;

  const favoriteCheeses = cheeses.filter((c) => favorites.includes(c.id));

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Imagem muito grande (máx 2MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      updateUser({ avatar: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sidebar / perfil */}
          <aside className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-gold">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-10 w-10 text-walnut" />
                  )}
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform hover:scale-105"
                  aria-label="Trocar foto"
                >
                  <Upload className="h-4 w-4" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </div>
              <h2 className="mt-4 font-serif text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6 text-center">
              <div>
                <div className="font-serif text-2xl font-semibold text-gold-deep">
                  {favorites.length}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Favoritos
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-gold-deep">0</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Pedidos
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-secondary py-2 text-sm font-medium text-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </aside>

          {/* Conteúdo */}
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              Painel do usuário
            </span>
            <h1 className="mt-2 font-serif text-4xl font-semibold">
              Olá, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
              Aqui ficam seus queijos favoritos e atividade recente.
            </p>

            <div className="mt-10">
              <div className="mb-6 flex items-center gap-2">
                <Heart className="h-5 w-5 fill-gold text-gold" />
                <h2 className="font-serif text-2xl font-semibold">Seus favoritos</h2>
              </div>

              {favoriteCheeses.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
                  <p className="font-serif text-lg">Nenhum favorito ainda</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Explore o catálogo e marque os queijos que mais te interessam.
                  </p>
                  <Link
                    to="/"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Ver catálogo
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {favoriteCheeses.map((c) => (
                    <CheeseCard key={c.id} cheese={c} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
