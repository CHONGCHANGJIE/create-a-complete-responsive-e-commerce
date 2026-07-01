"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { useStore } from "@/hooks/use-store";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((item) => item.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const store = useStore();

  useEffect(() => {
    if (product) store.addRecent(product.id);
  }, [product?.id]);

  const related = useMemo(() => products.filter((item) => item.category === product?.category && item.id !== product.id).slice(0, 4), [product]);
  const together = useMemo(() => products.filter((item) => item.brand === product?.brand && item.id !== product.id).slice(0, 3), [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-black">Product not found</h1>
        <Link className="mt-4 inline-block font-bold text-primary" href="/shop">Return to shop</Link>
      </div>
    );
  }

  const gallery = [product.image, ...products.slice(1, 4).map((item) => item.image)];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 text-sm text-muted-foreground"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.name}</div>
      <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <Image alt={product.name} className="object-cover transition duration-500 hover:scale-110" fill src={gallery[imageIndex]} />
            {product.isSale && <Badge className="absolute left-4 top-4 border-primary bg-primary text-zinc-950">Flash Sale</Badge>}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((src, index) => (
              <button className="relative aspect-square overflow-hidden rounded-md border focus-visible:outline-primary" key={src} onClick={() => setImageIndex(index)}>
                <Image alt={`${product.name} ${index + 1}`} className="object-cover" fill src={src} />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-sm font-black uppercase text-primary">{product.brand} · {product.sku}</p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted-foreground">{product.reviews} reviews</span>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black">{formatCurrency(product.price)}</span>
            {product.compareAt && <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.compareAt)}</span>}
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="grid gap-2">
            {product.features.map((feature) => <p className="flex items-center gap-2 text-sm" key={feature}><CheckCircle2 className="h-4 w-4 text-primary" /> {feature}</p>)}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border">
              <Button variant="ghost" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-bold">{quantity}</span>
              <Button variant="ghost" onClick={() => setQuantity((value) => value + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" disabled={product.stock === 0} onClick={() => store.addToCart(product.id, quantity)}><ShoppingCart className="h-5 w-5" /> Add to Cart</Button>
            <Button size="lg" variant="secondary" disabled={product.stock === 0} onClick={() => store.addToCart(product.id, quantity)}>Buy Now</Button>
            <Button size="lg" variant="outline" onClick={() => store.toggleWishlist(product.id)}><Heart className="h-5 w-5" /> Wishlist</Button>
          </div>
          <Card>
            <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
              <p><Truck className="mb-1 h-5 w-5 text-primary" /> Ships in 24 hours</p>
              <p>Free delivery over $250</p>
              <p>{product.stock > 0 ? `${product.stock} units ready` : "Backorder available"}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="specs" className="mt-10">
        <TabsList>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="mt-5">
          <div className="overflow-hidden rounded-lg border">
            {Object.entries(product.specs).map(([key, value]) => (
              <div className="grid grid-cols-2 border-b p-3 last:border-0" key={key}><span className="font-bold">{key}</span><span>{value}</span></div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="description" className="mt-5 text-muted-foreground">
          {product.description} It is suitable for procurement, maintenance, installation, and workshop environments where dependable product information matters.
        </TabsContent>
        <TabsContent value="reviews" className="mt-5 grid gap-4 md:grid-cols-3">
          {["Verified contractor", "Maintenance buyer", "Workshop technician"].map((role) => (
            <Card key={role}><CardContent><p className="font-bold">{role}</p><p className="mt-2 text-sm text-muted-foreground">Solid build quality, accurate specs, and clear ordering details.</p></CardContent></Card>
          ))}
        </TabsContent>
      </Tabs>

      <section className="mt-12">
        <SectionHeading eyebrow="Bundle" title="Frequently Bought Together" />
        <ProductGrid products={together} />
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Related" title="Related Products" />
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
