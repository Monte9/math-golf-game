import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Math Golf Game",
  description:
    "A puzzle game that combines golf scoring with mathematical operations. Use clubs to transform numbers and reach the target in par strokes or fewer.",
  openGraph: {
    title: "Math Golf Game",
    description:
      "A puzzle game that combines golf scoring with mathematical operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
