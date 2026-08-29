import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.heroSubtitle}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <div className="mx-auto flex max-w-7xl">
          <Sidebar />
          <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
