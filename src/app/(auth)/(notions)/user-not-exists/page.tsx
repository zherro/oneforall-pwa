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
        <H3 fontWeight="600">Ooops! Não encontramos uma conta vinculada a esse email.</H3>
        <Typography my="1rem" fontSize="1rem">
           Verifique se o email esta correto e tente novamente.
        </Typography>

        <FlexBox justifyContent="center">
          <Link href="recovery">
            <Button mr="0.75rem" color="primary.main" variant="outlined">
              Tentar Novamente
            </Button>
          </Link>
          <Link href="login">
            <Button ml="0.75rem" bg="primary.main" color="white">
              Login
            </Button>
          </Link>
        </FlexBox>
      </Box>
    </>
  );
};

export default UserAlreadExists;
