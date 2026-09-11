import type { Metadata, Viewport } from "next";
import { archivo, inter, spaceMono } from "./fonts";
import { basePath } from "@/lib/basePath";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theconcretegrp.com"),
  title: "THE CONCRETE GROUP",
  description: "A strategic communications and brand advisory for category-defining brands.",
  alternates: {
    canonical: "https://theconcretegrp.com",
  },
  openGraph: {
    title: "THE CONCRETE GROUP",
    description: "A strategic communications and brand advisory for category-defining brands.",
    url: "https://theconcretegrp.com",
    siteName: "THE CONCRETE GROUP",
    images: [
      {
        url: "/media/hero-poster.jpg",
        width: 2752,
        height: 1536,
        alt: "THE CONCRETE GROUP",
      },
    ],
  },
  icons: {
    icon: `${basePath}/brand-assets/favicon-32.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1C1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceMono.variable} ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href={`${basePath}/media/hero-poster.webp`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
