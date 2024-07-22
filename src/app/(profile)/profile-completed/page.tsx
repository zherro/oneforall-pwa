"use server";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H1, SemiSpan } from "@component/Typography";
import Link from "next/link";

const ProfileCompletedPage = async () => {
  return (
    <Box p="0.75rem" textAlign="center">
      <FlexBox justifyContent="center">
        <Icon size={320}>story-set/Account-rafiki</Icon>
      </FlexBox>
      <H1 textAlign="center" mb="2rem">
        Perfil Criado! Já deixamos tudo preparado.
      </H1>
      <SemiSpan fontSize="1.25rem" textAlign="center">
        Agora você pode começar a utilizar a plataforma, e escolher um plano que
        mais combina com seu negócio.
      </SemiSpan>

      <FlexBox justifyContent="center">
        <Link href={process.env.APP_REDIRECT_AFTERPROFILE_COMPLETED || "#"}>
          <Button
            bg="primary.main"
            color="white"
            style={{ fontSize: "1rem" }}
            p="1.25rem"
            mt="1.25rem"
          >
            Vamos lá!
          </Button>
        </Link>
      </FlexBox>
    </Box>
  );
};

export default ProfileCompletedPage;
