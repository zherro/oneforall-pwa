"use client";;
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H2, SemiSpan } from "@component/Typography";
import Icon from "@component/icon/Icon";
import { useSearchParams } from "next/navigation";

const RecoverySend = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <>
      <Box textAlign="center">
        <FlexBox justifyContent="center">
          <Icon mt="2rem" size="250px">
            story-set/Ok-pana
          </Icon>
        </FlexBox>
        <H2 fontWeight="600">
          Enviamos as instruções de recuperação de senha para o seu email!
        </H2>
        <SemiSpan my="1rem" fontSize="1.75rem">
          {email}
        </SemiSpan>
        <Typography my="1rem" fontSize="1.25rem">
          Verifique seu email, lembre-se de olhar também na caixa de spam!
        </Typography>
      </Box>
    </>
  );
};

export default RecoverySend;
