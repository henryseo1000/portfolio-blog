import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dots",
  description: "Blog Made By Hojun Seo",
  icons: {
    icon: "/logo_dark.svg"
  },
  verification: {
    google: "5W9n5dIhtETEngGlBIb3q2Z2L4zxocEzQ4E58yq2sRc"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
