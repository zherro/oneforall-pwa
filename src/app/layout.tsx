// components/layout.tsx
import { ReactNode } from "react";
// THEME PROVIDER
import StyledComponentsRegistry from "@lib/registry";
// APP PROVIDER
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";
import SupabaseProvider from "@supabaseutils/supabase.provider";
import { Open_Sans } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { Metadata } from "next";

const openSans = Open_Sans({ subsets: ["latin"] });

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
      <body suppressHydrationWarning={true} className={openSans.className}>
        <StyledComponentsRegistry>
          <ChakraProvider>
            <AppProvider>
              <SupabaseProvider>
                <StyledContext>
                  <main>{children}</main>
                </StyledContext>
              </SupabaseProvider>
            </AppProvider>
          </ChakraProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
