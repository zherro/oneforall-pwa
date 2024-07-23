"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H2, SemiSpan } from "@component/Typography";
import Icon from "@component/icon/Icon";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const WelcomeSendedContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Box textAlign="center">
      <FlexBox justifyContent="center">
        <Icon mt="2rem" size="250px">story-set/Ok-pana</Icon>
      </FlexBox>
      <H2 fontWeight="600">Verifique seu email!</H2>
      <SemiSpan my="1rem" fontSize="1.75rem">
        {email}
      </SemiSpan>
      <Typography my="1rem" fontSize="1.25rem">
        Enviamos um link de confirmação para o seu email.
      </Typography>
      <Typography my="1rem" fontSize="1.25rem">
        Lembre-se de olhar também na caixa de <b>SPAM</b>!
      </Typography>
    </Box>
  );
};

const WelcomeSended = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <WelcomeSendedContent />
    </Suspense>
  );
};

export default WelcomeSended;
