// components/layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
// THEME PROVIDER
import StyledComponentsRegistry from "@lib/registry";
// APP PROVIDER
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";
// import { ChakraProvider } from "@chakra-ui/react";
import SupabaseProvider from "@supabaseutils/supabase.provider";
import { Open_Sans } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

const openSans = Open_Sans({ subsets: ["latin"] });

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <ChakraProvider>
            <AppProvider>
              <SupabaseProvider>
                <StyledContext>{children}</StyledContext>
              </SupabaseProvider>
            </AppProvider>
          </ChakraProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
