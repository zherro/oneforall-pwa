"use client";
import { ReactElement, ReactNode } from "react";
import StyledAppLayout from "./styles";
import { Footer3 } from "@component/footer";
import Sticky from "@component/sticky";
import HeaderCustomer from "@component/header/HeaderCustomer";

// ===============================================================================
type Props = {
  title?: string;
  fluidHeader?: boolean;
  navbar?: ReactElement;
  children: ReactNode;
};
// ===============================================================================

export default function ShopLayout({ navbar, fluidHeader, children }: Props) {
  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={50}>
        <HeaderCustomer fluid={fluidHeader} />
      </Sticky>

      <div style={{ width: "100%", minHeight: "80vh" }}>{children}</div>

      <Footer3 />
    </StyledAppLayout>
  );
}
