import { Stack } from "@chakra-ui/react";
import Divider from "@component/Divider";
import { H2, SemiSpan } from "@component/Typography";
import Icon from "@component/icon/Icon";
import Link from "next/link";
import { FC } from "react";

interface Props {
  title: string;
  text?: string;
  children?: any;
  divider?: boolean;
  goBack?: string;
  mt?: string;
}

const GoBackLink = ({ link }: any) => (
  <Link href={link || "#"}>
    <Stack direction={["row"]}>
      <Icon color="primary" size="1.25rem">
        arrow-left
      </Icon>
      <SemiSpan color="primary.main">Voltar</SemiSpan>
    </Stack>
  </Link>
);

const TitleCard: FC<Props> = ({ ...props }) => (
  <>
    {props.goBack && <GoBackLink link={props.goBack} />}
    <H2 mt={props.mt}>{props.title}</H2>
    {props.text && <SemiSpan>{props.text}</SemiSpan>}
    {props.children && props.children}
    <Divider
        width="100%"
        marginTop="0.75rem"
        marginBottom=".5rem"
        backgroundColor={ props.divider ? "gray.500" : "none" }
      />
  </>
);

export default TitleCard;
