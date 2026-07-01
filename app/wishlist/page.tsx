"use client";

import { ProductGrid } from "@/components/product-grid";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/hooks/use-store";

export default function WishlistPage() {
  const { wishlistProducts } = useStore();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-black">Wishlist</h1>
      {wishlistProducts.length ? <ProductGrid products={wishlistProducts} /> : <Card><CardContent>No saved products yet.</CardContent></Card>}
    </div>
  );
}
