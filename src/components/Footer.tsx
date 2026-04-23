import { Wheat } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold">
                <Wheat className="h-4 w-4 text-walnut" />
              </div>
              <span className="font-serif text-lg font-semibold">Magna Caseus</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Marketplace de queijos nobres com curadoria artesanal. Acreditamos que
              experiências gastronômicas refinadas devem ser acessíveis — incluindo
              opções sem lactose e sem glúten.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">
              Navegar
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Catálogo</li>
              <li>Sobre nós</li>
              <li>Restrições alimentares</li>
              <li>Origem dos produtos</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">
              Contato
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>contato@magnacaseus.com</li>
              <li>+55 (11) 4000-0000</li>
              <li>São Paulo · Brasil</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Magna Caseus · Curadoria artesanal de queijos
          nobres
        </div>
      </div>
    </footer>
  );
}
