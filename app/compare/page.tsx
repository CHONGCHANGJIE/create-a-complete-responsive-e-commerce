"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/utils";

export default function ComparePage() {
  const { compareProducts, toggleCompare } = useStore();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-black">Product Comparison</h1>
      {compareProducts.length === 0 ? (
        <Card><CardContent>Add products to compare from any product card.</CardContent></Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[720px] text-sm">
            <tbody>
              {["name", "brand", "sku", "category", "price", "rating", "stock"].map((row) => (
                <tr className="border-b" key={row}>
                  <th className="w-36 bg-muted p-3 text-left capitalize">{row}</th>
                  {compareProducts.map((product) => (
                    <td className="p-3" key={product.id}>
                      {row === "name" ? <Link className="font-bold text-primary" href={`/product/${product.slug}`}>{product.name}</Link> : row === "price" ? formatCurrency(product.price) : String(product[row as keyof typeof product])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th className="bg-muted p-3 text-left">Actions</th>
                {compareProducts.map((product) => <td className="p-3" key={product.id}><Button variant="outline" onClick={() => toggleCompare(product.id)}>Remove</Button></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
