import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "CareerConnect — Campus Job & Internship Board",
  description: "Your bridge from campus to career. Agentic AI-powered recruitment ecosystem connecting university students across Bangladesh with top tech companies.",
  icons: {
    icon: "/icon",
    apple: "/icon",
  },
};

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import GoogleProvider from "@/providers/GoogleProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="paper">
      <body
        className={`${bricolage.variable} ${karla.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <ReactQueryProvider>
          <GoogleProvider>
            <ThemeProvider>
              <AuthProvider>
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
                  {children}
                </main>
                <Footer />
              </AuthProvider>
            </ThemeProvider>
          </GoogleProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
