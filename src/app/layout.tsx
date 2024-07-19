// components/layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
import { Metadata } from "next";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Next.js PWA Example",
  description: "An example of a PWA with Next.js",
  keywords: "PWA, Next.js, Example",
  viewport:
    "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no",
  themeColor: "#317EFB",
  manifest: "/manifest.json",
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
