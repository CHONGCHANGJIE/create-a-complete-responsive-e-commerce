"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, SlidersHorizontal } from "lucide-react";
import { brands, categories, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ProductGrid } from "@/components/product-grid";

const pageSize = 16;

export function ShopClient({ initialCategory = "All" }: { initialCategory?: string }) {
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState(initialCategory);
  const [availability, setAvailability] = useState("All");
  const [onlySale, setOnlySale] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState([250]);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = products
      .filter((product) => brand === "All" || product.brand === brand)
      .filter((product) => category === "All" || product.category === category)
      .filter((product) => availability === "All" || (availability === "In Stock" ? product.stock > 0 : product.stock === 0))
      .filter((product) => !onlySale || product.isSale)
      .filter((product) => !onlyNew || product.isNew)
      .filter((product) => product.rating >= rating)
      .filter((product) => product.price <= price[0]);

    return [...list].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "new") return Number(b.isNew) - Number(a.isNew);
      return b.reviews - a.reviews;
    });
  }, [availability, brand, category, onlyNew, onlySale, price, rating, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 text-sm text-muted-foreground"><Link href="/">Home</Link> / Shop</div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-primary">Catalog</p>
          <h1 className="text-3xl font-black">Shop Hardware Products</h1>
          <p className="text-muted-foreground">{filtered.length} matching products with live frontend filters.</p>
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="new">New arrivals</option>
          <option value="rating">Rating</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit lg:sticky lg:top-24">
          <CardContent className="space-y-5">
            <div className="flex items-center gap-2 font-black"><Filter className="h-4 w-4 text-primary" /> Filters</div>
            <FilterSelect label="Brand" value={brand} options={["All", ...brands]} onChange={setBrand} />
            <FilterSelect label="Category" value={category} options={["All", ...categories.map((item) => item.name)]} onChange={setCategory} />
            <FilterSelect label="Availability" value={availability} options={["All", "In Stock", "Backorder"]} onChange={setAvailability} />
            <div>
              <label className="mb-2 block text-sm font-bold">Max price: ${price[0]}</label>
              <Slider max={300} min={25} step={5} value={price} onValueChange={setPrice} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold">Minimum rating</label>
              <Input type="number" min={0} max={5} step={0.1} value={rating} onChange={(event) => setRating(Number(event.target.value))} />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={onlySale} onChange={(event) => setOnlySale(event.target.checked)} /> Sale items</label>
            <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={onlyNew} onChange={(event) => setOnlyNew(event.target.checked)} /> New arrivals</label>
          </CardContent>
        </Card>
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="h-4 w-4" /> Showing page {page} of {pages}</div>
          <ProductGrid products={visible} />
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, index) => (
              <Button key={index} variant={page === index + 1 ? "default" : "outline"} onClick={() => setPage(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">{label}</label>
      <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}
