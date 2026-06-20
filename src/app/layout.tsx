import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ParticlesBg from "@/components/ui/ParticlesBg";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyro | Premium Full-Stack Development Team",
  description: "Crafting modern, high-end SaaS applications, creative digital interfaces, and responsive web platforms. Meet Priyanshi Agarwal (Frontend Architect) and Divyam Saini (Backend Engineer).",
  keywords: ["Full-Stack Developers", "Kyro Studio", "React", "Next.js", "Node.js", "Portfolio", "Frontend Developer", "Backend Developer"],
  authors: [{ name: "Priyanshi Agarwal" }, { name: "Divyam Saini" }],
  creator: "Kyro Studio",
  metadataBase: new URL("https://kyro.dev"),
  openGraph: {
    title: "Kyro | Premium Full-Stack Development Team",
    description: "High-end digital agency & creative engineering by Priyanshi & Divyam.",
    url: "https://kyro.dev",
    siteName: "Kyro Studio Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyro | Premium Full-Stack Development Team",
    description: "High-end digital agency & creative engineering by Priyanshi & Divyam.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        <SmoothScrollProvider>
          <CustomCursor />
          <ParticlesBg />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


