import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./@components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quizz app",
  description: "A Quizz builder application , you can create and publish quizess in no time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-50 text-gray-900 min-h-screen   ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <main className="max-w-7xl mx-auto px-6 py-6">
          {children}

        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px",
            },
            success: {
              style: {
                background: "#22c55e", // Tailwind green-500
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#ef4444", // Tailwind red-500
                color: "#fff",
              },
            },
          }}
        />


       
            </body>
    </html>
  );
}
