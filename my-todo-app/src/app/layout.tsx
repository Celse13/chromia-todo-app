import type { Metadata } from "next";
import "./globals.css";
import { ContextProvider } from "@/components/ContextProvider";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}
      >
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
