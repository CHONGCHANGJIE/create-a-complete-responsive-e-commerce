"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { useStore } from "@/hooks/use-store";

export default function CartPage() {
  const { cartProducts, updateQuantity, removeFromCart, saveForLater } = useStore();
  const active = cartProducts.filter((item) => !item.saved);
  const saved = cartProducts.filter((item) => item.saved);
  const subtotal = active.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 18;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-black">Shopping Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {active.length === 0 && <Card><CardContent>Your cart is empty. <Link className="font-bold text-primary" href="/shop">Start shopping</Link>.</CardContent></Card>}
          {active.map((item) => (
            <Card key={item.id}>
              <CardContent className="grid gap-4 sm:grid-cols-[120px_1fr_auto]">
                <div className="relative aspect-square overflow-hidden rounded-md bg-muted"><Image alt={item.name} fill className="object-cover" src={item.image} /></div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.brand} · {item.sku}</p>
                  <Link className="font-black hover:text-primary" href={`/product/${item.slug}`}>{item.name}</Link>
                  <p className="mt-2 font-bold">{formatCurrency(item.price)}</p>
                  <Button className="mt-3" variant="outline" onClick={() => saveForLater(item.id)}>Save for later</Button>
                </div>
                <div className="flex items-center gap-2 sm:flex-col">
                  <div className="flex items-center rounded-md border">
                    <Button variant="ghost" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <Button variant="ghost" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                  </div>
                  <Button aria-label="Remove item" variant="ghost" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {saved.length > 0 && (
            <div>
              <h2 className="mb-3 text-xl font-black">Saved For Later</h2>
              {saved.map((item) => <Card key={item.id}><CardContent className="flex justify-between"><span>{item.name}</span><Button onClick={() => saveForLater(item.id)}>Move to cart</Button></CardContent></Card>)}
            </div>
          )}
        </div>
        <Card className="h-fit">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-black">Cart Summary</h2>
            <Input placeholder="Coupon code" />
            <Input placeholder="ZIP code for shipping estimator" />
            <div className="space-y-2 text-sm">
              <p className="flex justify-between"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></p>
              <p className="flex justify-between"><span>Shipping</span><strong>{shipping === 0 ? "Free" : formatCurrency(shipping)}</strong></p>
              <p className="flex justify-between border-t pt-3 text-lg"><span>Total</span><strong>{formatCurrency(subtotal + shipping)}</strong></p>
            </div>
            <Button asChild className="w-full" size="lg" disabled={active.length === 0}><Link href="/checkout">Checkout</Link></Button>
          </CardContent>
        </Card>
      </div>
      <section className="mt-12">
        <SectionHeading eyebrow="Recommended" title="Recommended Products" />
        <ProductGrid products={products.slice(12, 16)} />
      </section>
    </div>
  );
}
