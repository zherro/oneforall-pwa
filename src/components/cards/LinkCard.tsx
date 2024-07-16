import { Stack } from "@chakra-ui/react";
import { H4, TypographyCustomProps } from "@component/Typography";
import Icon, { IconProps } from "@component/icon/Icon";
import Link from "next/link";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { StyledLinkCard } from "./LinkCardStyled";
import { SpaceProps } from "styled-system";
import { colorOptions } from "../../interfaces";

type ComponentProps = IconProps & SpaceProps & ButtonHTMLAttributes<IconProps>;

interface TitleIconProps {
  color: colorOptions;
  mt: string;
  size: string;
}

interface Props {
  link: string;
  onClick?: Function;
  title: string;
  titleProps: TypographyCustomProps;
  titleIcon: string;
  titleIconProps: TitleIconProps;
  children: ReactNode;
  alignCenter?: boolean;
}

const LinkCard: FC<Props> = ({
  link,
  onClick,
  title,
  titleProps,
  titleIcon,
  titleIconProps,
  alignCenter,
  children,
}) => (
  <StyledLinkCard>
    <Link href={link} onClick={() => onClick && onClick()}>
      <Stack
        direction={["column", "row"]}
        align={alignCenter ? "center" : "start"}
        justifyContent={alignCenter ? "center" : "start"}
      >
        {titleIcon && <Icon {...titleIconProps}>{titleIcon}</Icon>}
        <H4 {...titleProps}>{title}</H4>
      </Stack>
      {children}
    </Link>
  </StyledLinkCard>
);

export default LinkCard;
