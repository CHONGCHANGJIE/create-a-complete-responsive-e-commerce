import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories, navLinks } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="border-t bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-black">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-zinc-950">HH</span>
            HardwareHub
          </div>
          <p className="text-sm text-zinc-400">Professional hardware, tools, PPE, and industrial supplies for modern teams.</p>
          <div className="space-y-2 text-sm text-zinc-300">
            <p className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> +1 800 555 0188</p>
            <p className="flex gap-2"><Mail className="h-4 w-4 text-primary" /> sales@hardwarehub.example</p>
            <p className="flex gap-2"><MapPin className="h-4 w-4 text-primary" /> 24 Forge Avenue, Industrial Park</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Shop</h3>
          <div className="grid gap-2 text-sm text-zinc-400">
            {categories.slice(0, 8).map((category) => (
              <Link className="hover:text-primary" href={`/shop?category=${encodeURIComponent(category.name)}`} key={category.name}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Company</h3>
          <div className="grid gap-2 text-sm text-zinc-400">
            {navLinks.map((link) => (
              <Link className="hover:text-primary" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link className="hover:text-primary" href="/store-locator">Store Locator</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Catalog Updates</h3>
          <p className="mb-3 text-sm text-zinc-400">Get new arrivals, flash sales, and MRO buying guides.</p>
          <div className="flex gap-2">
            <Input className="border-zinc-800 bg-zinc-900" placeholder="Email address" />
            <Button>Join</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800 px-4 py-5 text-center text-sm text-zinc-500">
        © 2026 HardwareHub. Built for responsive e-commerce demonstration.
      </div>
    </footer>
  );
}
