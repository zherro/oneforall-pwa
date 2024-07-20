// components/layout.tsx
import { ReactNode } from "react";
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

  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
    { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
