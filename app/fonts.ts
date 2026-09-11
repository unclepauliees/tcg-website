import localFont from "next/font/local";

// Variable Archivo covers weight 100–900 in one file, so display (900)
// and display-light (300) share a single font and never synthesize.
export const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
});

export const spaceMono = localFont({
  src: [
    { path: "./fonts/space-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-space-mono",
});

export const inter = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
});
