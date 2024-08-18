import type { Metadata } from "next";
import { urbanist } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVA",
  description: "Chatgpt for mental health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
