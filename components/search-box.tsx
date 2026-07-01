"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBox({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const results = useMemo(() => {
    const value = query.toLowerCase().trim();
    if (!value) return [];
    return products
      .filter((product) =>
        [product.name, product.sku, product.brand, product.category].some((field) =>
          field.toLowerCase().includes(value)
        )
      )
      .slice(0, 6);
  }, [query]);

  function remember(value: string) {
    setRecent((items) => [value, ...items.filter((item) => item !== value)].slice(0, 4));
  }

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        aria-label="Search products by name, SKU, brand, or category"
        className={compact ? "pl-9" : "h-12 pl-10 text-base"}
        placeholder="Search SKU, brand, category, or product"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query && (
        <Button
          aria-label="Clear search"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          size="icon"
          variant="ghost"
          onClick={() => setQuery("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {(results.length > 0 || recent.length > 0) && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-lg border bg-background shadow-industrial">
          {results.map((product) => (
            <Link
              className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-muted"
              href={`/product/${product.slug}`}
              key={product.id}
              onClick={() => remember(query)}
            >
              <span className="font-semibold">{product.name}</span>
              <span className="text-xs text-muted-foreground">{product.sku}</span>
            </Link>
          ))}
          {!query && recent.length > 0 && (
            <div className="border-t p-3 text-xs text-muted-foreground">Recent searches: {recent.join(", ")}</div>
          )}
        </div>
      )}
    </div>
  );
}
