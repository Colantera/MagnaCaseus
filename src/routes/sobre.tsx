import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Heart, Globe2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Magna Caseus" },
      {
        name: "description",
        content:
          "Conheça a história da Magna Caseus, marketplace de queijos nobres com curadoria gourmet e foco em acessibilidade alimentar.",
      },
      { property: "og:title", content: "Sobre a Magna Caseus" },
      {
        property: "og:description",
        content:
          "Acreditamos que sabor refinado deve ser acessível a todos — incluindo dietas sem lactose e sem glúten.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-4xl px-6 py-20">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
          Nossa história
        </span>
        <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight md:text-6xl">
          Queijos nobres,{" "}
          <span className="italic text-gold-deep">sem barreiras</span>.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          A Magna Caseus nasceu da convicção de que experiências gastronômicas refinadas
          não deveriam ser privilégio de poucos. Reunimos a melhor curadoria de queijos
          artesanais do mundo — incluindo opções econômicas, sem lactose e sem glúten —
          para que mais pessoas possam descobrir o prazer dos grandes clássicos.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Globe2,
              title: "Origem rastreada",
              text: "Trabalhamos diretamente com produtores tradicionais de cinco países. Cada queijo carrega uma história.",
            },
            {
              icon: Heart,
              title: "Acessibilidade real",
              text: "Filtros por restrições alimentares e faixa de preço — para que ninguém fique de fora.",
            },
            {
              icon: Sparkles,
              title: "Curadoria viva",
              text: "Nossa seleção é revisada constantemente por mestres queijeiros e degustadores certificados.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15">
                <Icon className="h-5 w-5 text-gold-deep" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-walnut p-10 text-cream shadow-elegant">
          <h2 className="font-serif text-3xl font-semibold">
            Pronto para descobrir seu próximo queijo favorito?
          </h2>
          <p className="mt-3 text-cream/80">
            Explore nossa seleção atual e encontre o que combina com seu paladar.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-medium text-walnut transition-transform hover:-translate-y-0.5"
          >
            Ver catálogo
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
