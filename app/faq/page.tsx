import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  ["Can I search by SKU?", "Yes. The live search matches product name, SKU, brand, and category."],
  ["Is there a backend?", "No. This demo uses local dummy data and browser localStorage for cart, wishlist, compare, and recently viewed products."],
  ["Do cart and wishlist persist?", "Yes. They remain in the browser until local storage is cleared."],
  ["Can I compare products?", "Yes. Use the compare button on product cards and open the comparison page."],
  ["Is checkout functional?", "Checkout is frontend-only and includes shipping, delivery, payment selection, order summary, and success screens."],
  ["Are products realistic?", "The catalog includes over 80 realistic tools, fasteners, PPE, plumbing, electrical, automotive, pneumatic, and industrial items."]
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm font-black uppercase text-primary">Support</p>
      <h1 className="mb-8 text-3xl font-black">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map(([question, answer]) => (
          <Card key={question}><CardContent><h2 className="font-black">{question}</h2><p className="mt-2 text-muted-foreground">{answer}</p></CardContent></Card>
        ))}
      </div>
    </div>
  );
}
