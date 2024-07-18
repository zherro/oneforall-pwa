"use client";
import Box from "@component/Box";
import Typography, { H2, SemiSpan } from "@component/Typography";
import { useSearchParams } from "next/navigation";

const WelcomeSended = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <>
      <Box textAlign="center">
        <H2 fontWeight="600">
          Verifique seu email!
        </H2>
        <SemiSpan my="1rem" fontSize="1.75rem">
          {email}
        </SemiSpan>


        <Typography my="1rem" fontSize="1.25rem">
          Lembre-se de olhar também na caixa de <b>SPAM</b>!
        </Typography>
      </Box>
    </>
  );
};

export default WelcomeSended;
