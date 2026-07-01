import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingTools } from "@/components/floating-tools";
import { StoreProvider } from "@/hooks/use-store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HardwareHub | Modern Online Hardware Store",
    template: "%s | HardwareHub"
  },
  description: "Shop professional tools, safety equipment, fasteners, electrical, plumbing, and industrial supplies.",
  keywords: ["hardware store", "tools", "industrial supplies", "power tools", "fasteners", "PPE"],
  openGraph: {
    title: "HardwareHub",
    description: "Premium responsive e-commerce hardware storefront.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingTools />
        </StoreProvider>
      </body>
    </html>
  );
}
