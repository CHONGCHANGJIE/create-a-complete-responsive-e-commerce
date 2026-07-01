import { ShopClient } from "@/app/shop/shop-client";

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return <ShopClient initialCategory={params.category || "All"} />;
}
