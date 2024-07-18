"use server";
import Box from "@component/Box";
import Typography, { H2 } from "@component/Typography";
import Link from "next/link";

const WelcomeSended = async () => {
  return (
    <>
      <Box textAlign="center">
        <H2 fontWeight="600">
          Oops! O código de validação é inválido ou expirou.
        </H2>

        <Typography my="1rem" fontSize="1.25rem">
          Utilize a opção{" "}
          <Link
            href="/recovery"
            style={{
              color: "#3370ff",
              textDecoration: "underline",
              lineHeight: 1.5,
              cursor: "pointer",
            }}
          >
            Recuperar Senha
          </Link>
          , para solicitar um novo código!
        </Typography>
      </Box>
    </>
  );
};

export default WelcomeSended;
