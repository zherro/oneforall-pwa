"use client";

import {
  color,
  space,
  layout,
  flexbox,
  position,
  ColorProps,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps
} from "styled-system";
import styled from "styled-components";

import { isValidProp } from "@utils/utils";
import { layoutConstant } from "@utils/constants";

interface ContainerProps {
  fluid: boolean;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop)
})<LayoutProps & ColorProps & PositionProps & SpaceProps & FlexboxProps & ContainerProps>`
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => props.fluid ? "1800px" : layoutConstant.containerWidth};

  @media only screen and (max-width: 1199px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ${color}
  ${position}
  ${flexbox}
  ${layout}
  ${space}
`;

export default Container;
