"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, ShieldCheck, Truck, Wrench, type LucideIcon } from "lucide-react";
import { brandHighlights, categories, products, testimonials } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchBox } from "@/components/search-box";
import { SectionHeading } from "@/components/section-heading";
import { ProductGrid } from "@/components/product-grid";

const featured = products.slice(0, 8);
const sale = products.filter((product) => product.isSale).slice(0, 4);
const best = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
const newest = products.filter((product) => product.isNew).slice(0, 8);
const serviceCards: Array<[LucideIcon, string, string]> = [
  [Truck, "Fast Fulfillment", "Live stock cues and delivery method selection."],
  [ShieldCheck, "Pro-Grade Brands", "Bosch, Makita, DeWalt, Milwaukee, Knipex, Wera, and more."],
  [Wrench, "Technical Detail", "Specs, SKUs, filters, related items, and comparison tools."]
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 opacity-35" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,122,0,.28),transparent_35%),linear-gradient(90deg,rgba(9,9,11,.92),rgba(9,9,11,.58))]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl content-center gap-8 px-4 py-16 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-3 text-sm font-black uppercase text-primary">Industrial-grade supply, built for speed</p>
            <h1 className="max-w-4xl text-4xl font-black tracking-normal md:text-6xl">HardwareHub</h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-200">A premium online hardware store for contractors, engineers, maintenance crews, and serious makers.</p>
            <div className="mt-7 max-w-2xl">
              <SearchBox />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/shop">Shop Products <ArrowRight className="h-5 w-5" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/categories">Browse Categories</Link></Button>
            </div>
          </motion.div>
          <motion.div
            className="grid content-end gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              {[
                ["80+", "hardware products"],
                ["13", "trusted brands"],
                ["24h", "dispatch window"]
              ].map(([value, label]) => (
                <div className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0" key={label}>
                  <span className="text-3xl font-black text-primary">{value}</span>
                  <span className="text-sm uppercase text-zinc-300">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {serviceCards.map(([Icon, title, body]) => (
            <Card key={title}><CardContent className="flex gap-4"><Icon className="h-7 w-7 text-primary" /><div><h3 className="font-bold">{title}</h3><p className="text-sm text-muted-foreground">{body}</p></div></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <SectionHeading eyebrow="Featured" title="Featured Products" body="A fast-scanning carousel-style row of jobsite favorites." />
        <div className="grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-5 overflow-x-auto pb-4">
          {featured.map((product) => <div className="w-[280px]" key={product.id}><ProductGrid products={[product]} /></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <SectionHeading eyebrow="Departments" title="Product Categories" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link className="rounded-lg border bg-card p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-industrial" href={`/shop?category=${encodeURIComponent(category.name)}`} key={category.name}>
              <category.icon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-black">{category.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Flash Sale" title="Limited-Time Site Deals" body="Discounted essentials for workshops and procurement teams." />
          <ProductGrid products={sale} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading eyebrow="Best Sellers" title="Top-Rated Hardware" />
        <ProductGrid products={best} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading eyebrow="New Arrivals" title="Fresh Stock For The Floor" />
        <ProductGrid products={newest} />
      </section>

      <section className="bg-zinc-950 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Brands" title="Trusted By Professionals" />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {brandHighlights.map((brand) => (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-center" key={brand.name}>
                <p className="font-black">{brand.name}</p>
                <p className="text-xs text-zinc-400">{brand.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading eyebrow="Reviews" title="Customer Testimonials" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}><CardContent><p className="text-muted-foreground">“{item.quote}”</p><p className="mt-4 font-bold">{item.name}</p><p className="text-sm text-primary">{item.role}</p></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 rounded-lg border bg-card p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black">Download the HardwareHub product catalog</h2>
            <p className="text-muted-foreground">A frontend catalog section for procurement packets and product reference sheets.</p>
          </div>
          <Button size="lg" variant="secondary"><Download className="h-5 w-5" /> Download PDF</Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 rounded-lg bg-primary p-6 text-zinc-950 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black">Get restock alerts and bulk offers</h2>
            <p className="font-medium">Newsletter signup with hardware-focused merchandising.</p>
          </div>
          <div className="flex gap-2">
            <Input className="bg-white" placeholder="Email address" />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
