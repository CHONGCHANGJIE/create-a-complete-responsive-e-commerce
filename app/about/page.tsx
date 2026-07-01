import { Award, Building2, PackageSearch, Users, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values: Array<[LucideIcon, string]> = [
  [Building2, "Industrial Focus"],
  [PackageSearch, "SKU-First Catalog"],
  [Award, "Premium Brands"],
  [Users, "Team Purchasing"]
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase text-primary">About Us</p>
        <h1 className="mt-2 text-4xl font-black">HardwareHub supplies the tools behind serious work.</h1>
        <p className="mt-4 text-muted-foreground">We are a modern e-commerce concept for professional hardware buyers, combining fast product discovery, clear technical data, and procurement-friendly shopping flows.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {values.map(([Icon, title]) => (
          <Card key={title}><CardContent><Icon className="mb-4 h-8 w-8 text-primary" /><h2 className="font-black">{title}</h2><p className="mt-2 text-sm text-muted-foreground">Designed for high-confidence hardware selection across desktop and mobile.</p></CardContent></Card>
        ))}
      </div>
    </div>
  );
}
