import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ChatHistory from "@/components/chatHistory";

const roboto = Roboto({ weight: ['400', '500'], subsets: ['latin'] });


export const metadata: Metadata = {
  title: "AI With Next.js",
  description: "AI Chat Website using Vercel AI, Github Models and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <div className="flex h-screen w-full p-2 space-x-2">
          <ChatHistory />
          {children}
        </div>
      </body>
    </html>
  );
}
