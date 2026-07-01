import { MapPin, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function StoreLocatorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm font-black uppercase text-primary">Store Locator</p>
      <h1 className="mb-6 text-3xl font-black">Find A HardwareHub Branch</h1>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Enter city or ZIP" />
            </div>
            {["Industrial Park Flagship", "Northside Trade Counter", "Harbor MRO Pickup"].map((store) => (
              <div className="rounded-md border p-3" key={store}>
                <h2 className="font-black">{store}</h2>
                <p className="text-sm text-muted-foreground">Open 7:30 AM - 6:00 PM · Trade pickup available</p>
                <Button className="mt-3" variant="outline"><Navigation className="h-4 w-4" /> Directions</Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="grid min-h-[520px] place-items-center rounded-lg border bg-muted">
          <div className="text-center">
            <MapPin className="mx-auto h-16 w-16 text-primary" />
            <p className="mt-3 text-xl font-black">Interactive Map Placeholder</p>
            <p className="text-muted-foreground">Ready for a map provider integration in production.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
