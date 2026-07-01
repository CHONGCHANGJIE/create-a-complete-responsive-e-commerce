"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/hooks/use-store";

export function QuickView({ product, children }: { product: Product; children: ReactNode }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image alt={product.name} className="object-cover" fill src={product.image} />
          </div>
          <div className="space-y-4">
            <div>
              <DialogTitle className="text-2xl font-black">{product.name}</DialogTitle>
              <DialogDescription>{product.sku} · {product.brand} · {product.category}</DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">{product.reviews} customer reviews</span>
            </div>
            <p className="text-3xl font-black">{formatCurrency(product.price)}</p>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <ul className="grid gap-2 text-sm">
              {product.features.map((feature) => <li key={feature}>• {feature}</li>)}
            </ul>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</Button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <Button variant="outline" onClick={() => setQuantity((value) => value + 1)}>+</Button>
              <Button className="flex-1" disabled={product.stock === 0} onClick={() => addToCart(product.id, quantity)}>
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
