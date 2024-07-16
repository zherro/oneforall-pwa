"use client";
import { getTheme } from "@utils/utils";
import styled from "styled-components";
import {
  color,
  ColorProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

interface ChipProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    PositionProps {
  cursor?: string;
  boxShadow?: string;
  boderColor?: string;
}

export const Chip = styled.div<ChipProps>`
  display: inline-flex;
  border-radius: 300px;
  transition: all 150ms ease-in-out;
  cursor: ${(props) => props.cursor || "unset"};
  box-shadow: ${(props) => props.boxShadow || "unset"};
  ${space}
  ${color}
  ${position}
  ${typography}
`;

export const ChipSquare = styled.div<ChipProps>`
  display: inline-flex;
  transition: all 150ms ease-in-out;
  cursor: ${(props) => props.cursor || "unset"};
  box-shadow: ${(props) => props.boxShadow || "unset"};
  border-bottom: 3px solid ${(props) => getTheme(props.boderColor || "unset")};
  ${space}
  ${color}
  ${position}
  ${typography}
`;