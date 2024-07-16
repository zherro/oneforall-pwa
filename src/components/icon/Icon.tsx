"use client";

import { MouseEventHandler, ReactNode, forwardRef } from "react";
import { ReactSVG } from "react-svg";
import { SpaceProps } from "styled-system";

import { colorOptions } from "interfaces";
import { StyledSvgWrapper } from "./styles";

// ==============================================================
export interface IconProps {
  size?: string | number;
  transform?: string;
  className?: string;
  children: ReactNode;
  color?: colorOptions;
  variant?: "small" | "medium" | "large";
  defaultcolor?: "currentColor" | "auto" | string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

type ComponentProps = IconProps & SpaceProps;
// ==============================================================

const Icon = forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
  const {
    children,
    onClick,
    variant = "medium",
    defaultcolor = "currentColor",
    ...others
  } = props || {};

  if (typeof children !== "string") return null;

  return (
    <StyledSvgWrapper ref={ref} variant={variant} defaultcolor={defaultcolor} {...others}>
      <ReactSVG src={`/assets/images/icons/${children}.svg`} />
    </StyledSvgWrapper>
  );
});

export default Icon;
