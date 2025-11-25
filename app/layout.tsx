import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import ScrollDamping from "./components/ScrollDamping";
import ScrollToTop from "./components/ScrollToTop";

export const metadata: Metadata = {
  title: "The Speed Machine - Tour-Level Distance Control",
  description: "Join thousands of golfers lowering their handicaps with data-driven putting practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <ScrollToTop />
        <ScrollDamping />
        <Navigation />
        {children}
      </body>
    </html>
  );
}

