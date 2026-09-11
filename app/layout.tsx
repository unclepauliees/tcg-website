import type { Metadata, Viewport } from "next";
import { archivo, inter, spaceMono } from "./fonts";
import { basePath, siteUrl } from "@/lib/basePath";
import "./globals.css";

const title = "THE CONCRETE GROUP";
const description = "A strategic communications and brand advisory for category-defining brands.";
const ogImageUrl = `${siteUrl}/media/hero-poster.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: [
      {
        url: ogImageUrl,
        width: 1920,
        height: 1080,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl],
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
