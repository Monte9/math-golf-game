import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="forest"
          themes={["forest", "cyber", "midnight"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
