"use client";

import {
  flex,
  space,
  color,
  border,
  layout,
  textStyle,
  typography,
  FlexProps,
  SpaceProps,
  ColorProps,
  BorderProps,
  LayoutProps,
  TypographyProps,
  TextStyleProps,
} from "styled-system";
import styled, { CSSProperties } from "styled-components";
import { isValidProp } from "@utils/utils";

// ==============================================================
interface CustomProps
  extends TypographyProps,
    SpaceProps,
    ColorProps,
    FlexProps,
    LayoutProps,
    BorderProps,
    TextStyleProps {
  ref?: any;
  as?: any;
  title?: string;
  className?: string;
  ellipsis?: boolean;
  style?: CSSProperties;
  onClick?: (e: any) => void;
  [key: string]: any;
  responsive?: boolean;
}

export interface TypographyCustomProps extends CustomProps {}
// ==============================================================

const Typography = styled.div.withConfig({
  shouldForwardProp: (prop) => isValidProp(prop),
})<CustomProps>`
  ${(props) =>
    props.ellipsis
      ? `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `
      : ""}

  ${flex}
  ${space}
  ${color}
  ${border}
  ${layout}
  ${textStyle}
  ${typography}
`;

const H1_responsive = styled(Typography)`
  font-size: 1.25rem;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const H2_responsive = styled(Typography)`
  // Dispositivos extra small (telefones em modo retrato, com menos de 576px)
  // Sem media query para xs, já que este é o padrão, no Bootstrap.

  // Dispositivos small (telefones em modo paisagem, com 576px ou mais)
  @media (min-width: 576px) {
    font-size: 1rem;
  }

  // Dispositivos médios (tablets com 768px ou mais)
  @media (min-width: 768px) {
    font-size: 1rem;
  }

  // Dispositivos large (desktops com 992px ou mais)
  @media (min-width: 992px) {
    font-size: 1rem;
  }

  // Dispositivos extra large (desktops grandes com 1200px ou mais)
  @media (min-width: 1200px) {
    font-size: 1rem;
  }
`;
export const H1 = (props: CustomProps) => {
  if (props.responsive) {
    return <H1_responsive as="h1" mb="0" mt="0" {...props} />;
  } else {
    return <Typography as="h1" mb="0" mt="0" fontSize="30px" {...props} />;
  }
};

export const H2 = (props: CustomProps) => {
  if (props.responsive) {
    return <H2_responsive as="h2" mb="0" mt="0" {...props} />;
  } else {
    return <Typography as="h2" mb="0" mt="0" fontSize="25px" {...props} />;
  }
};

export const H3 = (props: CustomProps) => (
  <Typography as="h3" mb="0" mt="0" fontSize="20px" {...props} />
);

export const H4 = (props: CustomProps) => (
  <Typography
    as="h4"
    mb="0"
    mt="0"
    fontWeight="600"
    fontSize="17px"
    {...props}
  />
);

export const H5 = (props: CustomProps) => (
  <Typography
    as="h5"
    mb="0"
    mt="0"
    fontWeight="600"
    fontSize="16px"
    {...props}
  />
);

export const H6 = (props: CustomProps) => (
  <Typography
    as="h6"
    mb="0"
    mt="0"
    fontWeight="600"
    fontSize="14px"
    {...props}
  />
);

export const Paragraph = (props: CustomProps) => (
  <Typography as="p" mb="0" mt="0" {...props} />
);

export const Span = (props: CustomProps) => (
  <Typography as="span" fontSize="16px" {...props} />
);

export const SemiSpan = (props: CustomProps) => (
  <Typography as="span" fontSize="14px" color="text.muted" {...props} />
);

export const Small = (props: CustomProps) => (
  <Typography as="span" fontSize="12px" {...props} />
);

export const Tiny = (props: CustomProps) => (
  <Typography as="span" fontSize="10px" {...props} />
);

export default Typography;
