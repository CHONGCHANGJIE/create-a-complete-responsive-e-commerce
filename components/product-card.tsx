"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, Scale, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { formatCurrency, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/hooks/use-store";
import { QuickView } from "@/components/quick-view";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare } = useStore();
  const discount = product.compareAt ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100) : 0;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <Card className="group h-full overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            alt={product.name}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            src={product.image}
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {discount > 0 && <Badge className="border-primary bg-primary text-zinc-950">-{discount}%</Badge>}
            {product.isNew && <Badge className="bg-zinc-950 text-white">New</Badge>}
          </div>
          <div className="absolute right-3 top-3 grid gap-2 opacity-0 transition group-hover:opacity-100">
            <QuickView product={product}>
              <Button aria-label="Quick view" size="icon" variant="secondary"><Eye className="h-4 w-4" /></Button>
            </QuickView>
            <Button aria-label="Wishlist" size="icon" variant="secondary" onClick={() => toggleWishlist(product.id)}>
              <Heart className={cn("h-4 w-4", wishlist.includes(product.id) && "fill-primary text-primary")} />
            </Button>
            <Button aria-label="Compare" size="icon" variant="secondary" onClick={() => toggleCompare(product.id)}>
              <Scale className={cn("h-4 w-4", compare.includes(product.id) && "text-primary")} />
            </Button>
          </div>
        </div>
        <CardContent className="flex h-[260px] flex-col">
          <div className="mb-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{product.sku}</span>
            <span>{product.brand}</span>
          </div>
          <Link className="line-clamp-2 min-h-10 font-bold hover:text-primary" href={`/product/${product.slug}`}>
            {product.name}
          </Link>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-xl font-black">{formatCurrency(product.price)}</span>
            {product.compareAt && <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.compareAt)}</span>}
          </div>
          <div className={cn("mt-2 text-sm font-semibold", product.stock > 0 ? "text-emerald-600" : "text-red-600")}>
            {product.stock > 0 ? `${product.stock} in stock` : "Backorder"}
          </div>
          <div className="mt-auto grid grid-cols-[1fr_auto] gap-2">
            <Button disabled={product.stock === 0} onClick={() => addToCart(product.id)}>
              <ShoppingCart className="h-4 w-4" /> Add
            </Button>
            <QuickView product={product}>
              <Button variant="outline">Quick View</Button>
            </QuickView>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
