import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JoinScentJourney } from "@/components/landing";
import { sackersGothic, circularStd, sephir } from "@/lib/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subi Scentia",
  description: "Where conscious luxury meets timeless elegance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sackersGothic.variable} ${circularStd.variable} ${sephir.variable} antialiased bg-white font-circular`}>
        {/* <Navbar /> */}
        {children}
        {/* Join Scent Journey Section */}
        {/* <JoinScentJourney /> */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
