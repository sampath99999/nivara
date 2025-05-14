import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
});

export const metadata: Metadata = {
  title: "Nivara - HRMS",
  description: "Secure and Free HRMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
