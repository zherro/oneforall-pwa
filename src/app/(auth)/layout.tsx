import { PropsWithChildren } from "react";
import FlexBox from "@component/FlexBox";
import SupabaseProvider from "@supabaseutils/supabase.provider";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SupabaseProvider>
      <FlexBox minHeight="100vh" alignItems="center" flexDirection="column" justifyContent="center">
        {children}
      </FlexBox>
    </SupabaseProvider>
  );
}
