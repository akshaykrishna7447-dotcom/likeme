import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Global3DScene } from "@/components/effects/Global3DScene";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "LIKE ME | Premium Transformation Studio",
  description: "Experience the art of transformation at LIKE ME. Expert grooming for the modern individual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-white selection:bg-brand-blue selection:text-brand-black relative">
        <Global3DScene />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
