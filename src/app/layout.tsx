import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import TopInfo from "@/components/shared/Navbar/TopInfo";
import ScrollLoader from "@/components/shared/ScrollLoader";
import "react-pagination-bar/dist/index.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fashion",
    template: "%s | Fashion",
  },
  description: "The Best Fashion Store. The Official website for fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className}  antialiased`}>
        <TopInfo></TopInfo>
        <div className="sticky top-0 z-50 ">
          <Navbar></Navbar>
        </div>

        <div className="min-h-[calc(100vh-140px)] md:pt-10 md:pb-16 pt-5 pb-8">
          {children}
        </div>
        <div className="bg-[#F6F6F6] lg:py-14 py-8 overflow-hidden ">
          <Footer></Footer>
        </div>

        {/* <ScrollLoader></ScrollLoader> */}
      </body>
    </html>
  );
}
