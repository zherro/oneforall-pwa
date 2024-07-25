import AppLayout from "@component/layout/layout-1";
// import SubFooter from "@component/footer/SubFooter";

export default function Layout({ children }) {
  return <AppLayout fixedFooterOnMobile>{children}</AppLayout>;
}
