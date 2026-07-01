import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const contactMethods: Array<[LucideIcon, string]> = [
  [Phone, "+1 800 555 0188"],
  [Mail, "sales@hardwarehub.example"],
  [MapPin, "24 Forge Avenue, Industrial Park"]
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm font-black uppercase text-primary">Contact</p>
      <h1 className="mb-8 text-3xl font-black">Talk To HardwareHub</h1>
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="space-y-4">
          {contactMethods.map(([Icon, text]) => (
            <Card key={text}><CardContent className="flex gap-3"><Icon className="h-5 w-5 text-primary" /><span className="font-semibold">{text}</span></CardContent></Card>
          ))}
        </div>
        <Card>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Name" />
              <Input placeholder="Email" />
              <Input className="md:col-span-2" placeholder="Subject" />
              <textarea className="min-h-36 rounded-md border bg-background p-3 text-sm md:col-span-2" placeholder="Message" />
            </div>
            <Button>Send Message</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
