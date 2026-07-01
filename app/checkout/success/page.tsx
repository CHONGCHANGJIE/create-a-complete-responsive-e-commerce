import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-16 text-center">
      <div>
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-5 text-3xl font-black">Order Confirmed</h1>
        <p className="mt-3 text-muted-foreground">Your HardwareHub demo order has been placed successfully. A confirmation UI would be sent here in a production build.</p>
        <Button asChild className="mt-6"><Link href="/shop">Continue Shopping</Link></Button>
      </div>
    </div>
  );
}
