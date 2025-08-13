import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import TopInfo from "@/components/shared/Navbar/TopInfo";
import "react-pagination-bar/dist/index.css";
import NextTopLoader from "nextjs-toploader";

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

        <div className="min-h-[calc(100vh-140px)] md:pb-16 pb-8 md:pt-5 pt-4">
          {children}
        </div>
        <div className="bg-[#F6F6F6] lg:py-14 py-8">
          <Footer></Footer>
        </div>

          <NextTopLoader
          color="#fff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #232323,0 0 5px #EA5326"
          zIndex={1600}
          showAtBottom={false}
        />

        {/* <ScrollLoader></ScrollLoader> */}
      </body>
    </html>
  );
}
