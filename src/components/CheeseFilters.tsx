import { CheeseType, CHEESE_TYPES } from "@/services/api";

export interface FilterState {
  type: CheeseType | "Todos";
  maxPrice: number;
  lactoseFree: boolean;
  glutenFree: boolean;
  search: string;
}

export const DEFAULT_FILTERS: FilterState = {
  type: "Todos",
  maxPrice: 200,
  lactoseFree: false,
  glutenFree: false,
  search: "",
};

interface Props {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

export function CheeseFilters({ filters, onChange }: Props) {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <aside className="space-y-7 rounded-xl border border-border bg-card p-6 shadow-card">
      <div>
        <h3 className="font-serif text-lg font-semibold">Buscar</h3>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Nome ou origem..."
          className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div>
        <h3 className="font-serif text-lg font-semibold">Tipo de queijo</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["Todos", ...CHEESE_TYPES] as const).map((t) => {
            const active = filters.type === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => update("type", t)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "border-gold bg-gold/15 text-foreground"
                    : "border-border bg-secondary text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg font-semibold">Preço máximo</h3>
          <span className="font-serif text-sm font-semibold text-gold">
            R$ {filters.maxPrice.toFixed(0)}
          </span>
        </div>
        <input
          type="range"
          min={40}
          max={200}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", Number(e.target.value))}
          className="mt-3 w-full accent-[var(--gold)]"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>R$ 40</span>
          <span>R$ 200+</span>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg font-semibold">Restrições</h3>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={filters.lactoseFree}
              onChange={(e) => update("lactoseFree", e.target.checked)}
              className="h-4 w-4 rounded border-input accent-[var(--gold)]"
            />
            <span>Sem lactose</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={filters.glutenFree}
              onChange={(e) => update("glutenFree", e.target.checked)}
              className="h-4 w-4 rounded border-input accent-[var(--gold)]"
            />
            <span>Sem glúten</span>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="w-full rounded-md border border-border bg-secondary py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
      >
        Limpar filtros
      </button>
    </aside>
  );
}
