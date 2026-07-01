import Link from "next/link";
import { categories, products } from "@/data/products";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm font-black uppercase text-primary">Departments</p>
      <h1 className="mb-8 text-3xl font-black">Hardware Categories</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const count = products.filter((product) => product.category === category.name).length;
          return (
            <Link className="rounded-lg border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-industrial" href={`/shop?category=${encodeURIComponent(category.name)}`} key={category.name}>
              <category.icon className="mb-5 h-10 w-10 text-primary" />
              <h2 className="text-xl font-black">{category.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
              <p className="mt-4 font-bold">{count} products</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
