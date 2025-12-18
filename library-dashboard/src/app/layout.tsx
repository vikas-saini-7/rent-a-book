import type { Metadata } from "next";
import { Playfair_Display, Lexend } from "next/font/google";
import "./globals.css";
import { LibraryAuthProvider } from "@/contexts/LibraryAuthContext";

// const playfairDisplay = Playfair_Display({
//   variable: "--font-playfair-display",
//   subsets: ["latin"],
// });

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Library Dashboard | RentABook",
  description:
    "Manage catalog, rentals, and operations for RentABook partner libraries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${lexend.variable} antialiased font-body`}>
        <LibraryAuthProvider>{children}</LibraryAuthProvider>
      </body>
    </html>
  );
}
