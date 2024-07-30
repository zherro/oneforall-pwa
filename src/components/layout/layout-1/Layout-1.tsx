"use client";
import { ReactElement, ReactNode } from "react";
import StyledAppLayout from "./styles";
import { Footer3 } from "@component/footer";
import Sticky from "@component/sticky";
import HeaderCustomer from "@component/header/HeaderCustomer";
import AddToHomeScreen from "@component/AddToHomeScreen/AddToHomeScreen";

// ===============================================================================
type Props = {
  title?: string;
  fluidHeader?: boolean;
  navbar?: ReactElement;
  fixedFooterOnMobile?: boolean;
  children: ReactNode;
};
// ===============================================================================

export default function ShopLayout({
  navbar,
  fluidHeader,
  children,
  fixedFooterOnMobile = false,
}: Props) {
  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={50}>
        <>
          <AddToHomeScreen />
          <HeaderCustomer fluid={fluidHeader} />
        </>
      </Sticky>

      <div style={{ width: "100%", minHeight: "80vh" }}>{children}</div>

      <Footer3 fixedFooterOnMobile={fixedFooterOnMobile} />
    </StyledAppLayout>
  );
}
