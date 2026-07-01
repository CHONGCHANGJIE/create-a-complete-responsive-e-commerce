"use client";

import Link from "next/link";
import { ArrowUp, MessageCircle, Scale, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/utils";

export function FloatingTools() {
  const { cartCount, cartProducts, compareProducts } = useStore();
  const total = cartProducts.filter((item) => !item.saved).reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-30 grid gap-3">
        <Button asChild className="h-12 rounded-full shadow-industrial" variant="secondary">
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">{cartCount} · {formatCurrency(total)}</span>
          </Link>
        </Button>
        <Button asChild className="h-12 rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
          <a href="https://wa.me/18005550188" aria-label="WhatsApp contact">
            <MessageCircle className="h-5 w-5" />
          </a>
        </Button>
        <Button aria-label="Back to top" className="h-12 rounded-full" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
      {compareProducts.length > 0 && (
        <Link
          className="fixed bottom-5 left-5 z-30 flex items-center gap-2 rounded-full border bg-background px-4 py-3 text-sm font-bold shadow-industrial"
          href="/compare"
        >
          <Scale className="h-4 w-4 text-primary" /> Compare {compareProducts.length}
        </Link>
      )}
      <div className="fixed bottom-24 right-5 z-20 hidden w-72 rounded-lg border bg-background p-4 shadow-industrial lg:block">
        <div className="mb-1 flex items-center gap-2 font-bold">
          <MessageCircle className="h-4 w-4 text-primary" /> Live Chat
        </div>
        <p className="text-sm text-muted-foreground">Ask about bulk pricing, lead time, or product compatibility.</p>
        <Button className="mt-3 w-full" variant="outline">Start Chat</Button>
      </div>
    </>
  );
}
