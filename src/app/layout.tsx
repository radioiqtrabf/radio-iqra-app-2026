import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RADIO IQRA TV - La Voix du Saint Coran",
  description: "Station islamique dédiée à la diffusion des enseignements authentiques de l'Islam. Écoutez le Saint Coran, les hadiths et les programmes éducatifs en direct du Burkina Faso.",
  keywords: ["Radio Islamique", "Coran", "Hadiths", "Burkina Faso", "IQRA TV", "Radio en direct", "Islam"],
  authors: [{ name: "RADIO IQRA TV" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "RADIO IQRA TV - La Voix du Saint Coran",
    description: "Station islamique dédiée à la diffusion des enseignements authentiques de l'Islam",
    url: "https://radioiqraburkina.com",
    siteName: "RADIO IQRA TV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RADIO IQRA TV",
    description: "La Voix du Saint Coran - Station islamique du Burkina Faso",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
