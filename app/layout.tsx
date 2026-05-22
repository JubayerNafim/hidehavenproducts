import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "Hide Haven — Handcrafted Full-Grain Leather Goods",
  description:
    "The leading purveyor of handcrafted full-grain leather goods in Bangladesh. Shop heritage-quality wallets, bags, belts, and accessories.",
  keywords: [
    "leather goods",
    "handcrafted",
    "Bangladesh",
    "full-grain leather",
    "wallets",
    "bags",
    "belts",
  ],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
  },
  openGraph: {
    title: "Hide Haven — Handcrafted Full-Grain Leather Goods",
    description:
      "Sustainable luxury craftsmanship. Heritage-quality leather essentials.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
