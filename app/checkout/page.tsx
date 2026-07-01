"use client";

import Link from "next/link";
import { CreditCard, MapPin, PackageCheck, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStore } from "@/hooks/use-store";

export default function CheckoutPage() {
  const { cartProducts, clearCart } = useStore();
  const active = cartProducts.filter((item) => !item.saved);
  const subtotal = active.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 18;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-black">Checkout</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-black"><MapPin className="h-5 w-5 text-primary" /> Shipping Address</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="First name" />
                <Input placeholder="Last name" />
                <Input className="md:col-span-2" placeholder="Company" />
                <Input className="md:col-span-2" placeholder="Street address" />
                <Input placeholder="City" />
                <Input placeholder="ZIP code" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-black"><Truck className="h-5 w-5 text-primary" /> Delivery Method</h2>
              {["Standard delivery", "Express courier", "Store pickup"].map((method, index) => (
                <label className="flex items-center justify-between rounded-md border p-3" key={method}>
                  <span><input className="mr-2" name="delivery" type="radio" defaultChecked={index === 0} /> {method}</span>
                  <strong>{index === 0 ? "Free over $250" : index === 1 ? "$28" : "Free"}</strong>
                </label>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-black"><CreditCard className="h-5 w-5 text-primary" /> Payment</h2>
              <label className="flex items-center gap-2 rounded-md border p-3"><input name="payment" type="radio" defaultChecked /> Credit card</label>
              <label className="flex items-center gap-2 rounded-md border p-3"><input name="payment" type="radio" /> Purchase order</label>
              <label className="flex items-center gap-2 rounded-md border p-3"><input name="payment" type="radio" /> Bank transfer</label>
            </CardContent>
          </Card>
        </div>
        <Card className="h-fit">
          <CardContent className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-black"><PackageCheck className="h-5 w-5 text-primary" /> Order Summary</h2>
            {active.map((item) => (
              <p className="flex justify-between gap-3 text-sm" key={item.id}><span>{item.quantity} × {item.name}</span><strong>{formatCurrency(item.price * item.quantity)}</strong></p>
            ))}
            <div className="space-y-2 border-t pt-3 text-sm">
              <p className="flex justify-between"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></p>
              <p className="flex justify-between"><span>Shipping</span><strong>{shipping ? formatCurrency(shipping) : "Free"}</strong></p>
              <p className="flex justify-between text-lg"><span>Total</span><strong>{formatCurrency(subtotal + shipping)}</strong></p>
            </div>
            <Button asChild className="w-full" size="lg" onClick={clearCart}><Link href="/checkout/success">Place Order</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
