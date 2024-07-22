import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography, { H3 } from "@component/Typography";
import Link from "next/link";

const UserAlreadExists = async () => {
  return (
    <>
      <Box textAlign="center">
        <FlexBox justifyContent="center">
          <Icon size="260px">story-set/Search-amico</Icon>
        </FlexBox>
        <H3 fontWeight="600">Já existe uma conta vinculada a esse email!</H3>
        <Typography my="1rem" fontSize="1rem">
          Tente fazer login ou utilize a opção recuperar sua senha.
        </Typography>

        <FlexBox justifyContent="center">
          <Link href="login">
            <Button mr="0.75rem" bg="primary.main" color="white">
              Entrar
            </Button>
          </Link>
          <Link href="recovery">
            <Button ml="0.75rem" bg="primary.main" color="white">
              Recuperar Senha
            </Button>
          </Link>
        </FlexBox>
      </Box>
    </>
  );
};

export default UserAlreadExists;
