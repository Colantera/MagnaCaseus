import { useEffect, useState } from "react";
import { api, Cheese } from "@/services/api";

export function useCheeses() {
  const [data, setData] = useState<Cheese[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .getCheeses()
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export function useCheese(id: string | undefined) {
  const [data, setData] = useState<Cheese | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    api.getCheeseById(id).then((res) => {
      if (!cancelled) {
        setData(res ?? null);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, loading };
}
