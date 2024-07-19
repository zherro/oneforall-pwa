import SupabaseProvider from "@supabaseutils/supabase.provider";
import AppLayout from "@component/layout/layout-1";
// import SubFooter from "@component/footer/SubFooter";

export default function Layout({ children }) {
  return (
    <SupabaseProvider>
      <AppLayout>
        {children}
      </AppLayout>
    </SupabaseProvider>
  );
}
