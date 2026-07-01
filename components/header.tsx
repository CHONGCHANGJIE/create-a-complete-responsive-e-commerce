"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Moon, Scale, ShieldCheck, ShoppingCart, Sun, Truck, X } from "lucide-react";
import { navLinks } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/search-box";
import { useStore } from "@/hooks/use-store";

export function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, compare, dark, toggleDark } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="hidden border-b bg-zinc-950 text-xs font-semibold text-zinc-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <span className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-primary" /> Free delivery over $250</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Trade-grade brands and local pickup</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link className="flex items-center gap-2 font-black tracking-normal" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-zinc-950 text-primary ring-2 ring-primary/30 dark:bg-primary dark:text-zinc-950">HH</span>
          <span className="text-lg">HardwareHub</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
          {navLinks.map((link) => (
            <Link className="rounded-md px-2 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-primary" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="rounded-md px-2 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-primary" href="/store-locator">
            Stores
          </Link>
        </nav>
        <div className="ml-auto hidden w-full max-w-sm md:block">
          <SearchBox compact />
        </div>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button aria-label="Toggle color mode" size="icon" variant="ghost" onClick={toggleDark}>
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button asChild aria-label="Wishlist" size="icon" variant="ghost">
            <Link className="relative" href="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <span className="absolute -right-1 -top-1 text-xs text-primary">{wishlist.length}</span>}
            </Link>
          </Button>
          <Button asChild aria-label="Compare" size="icon" variant="ghost">
            <Link className="relative" href="/compare">
              <Scale className="h-5 w-5" />
              {compare.length > 0 && <span className="absolute -right-1 -top-1 text-xs text-primary">{compare.length}</span>}
            </Link>
          </Button>
          <Button asChild aria-label="Cart" size="icon" variant="secondary">
            <Link className="relative" href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 text-xs text-primary">{cartCount}</span>}
            </Link>
          </Button>
          <Button className="lg:hidden" size="icon" variant="ghost" onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t px-4 pb-4 lg:hidden">
          <div className="py-3 md:hidden">
            <SearchBox compact />
          </div>
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link className="rounded-md px-3 py-2 font-semibold hover:bg-muted" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link className="rounded-md px-3 py-2 font-semibold hover:bg-muted" href="/store-locator">
              Store Locator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
