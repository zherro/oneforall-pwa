"use client";
import { ReactElement, ReactNode } from "react";
import StyledAppLayout from "./styles";
import { Footer3 } from "@component/footer";
import Sticky from "@component/sticky";
import HeaderCustomer from "@component/header/HeaderCustomer";

// ===============================================================================
type Props = {
  title?: string;
  navbar?: ReactElement;
  children: ReactNode;
};
// ===============================================================================

export default function ShopLayout({ navbar, children }: Props) {
  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={50}>
        <HeaderCustomer />
      </Sticky>

      <div style={{ width: "100%", minHeight: "85vh", paddingTop: "5rem" }}>
        {children}
      </div>

      <Footer3 />
    </StyledAppLayout>
  );
}
