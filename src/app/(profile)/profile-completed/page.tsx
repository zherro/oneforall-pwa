"use client";;
import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H1, H2, SemiSpan } from "@component/Typography";
import { useWindowIsTablet } from "@hook/useWindowSize";
import Link from "next/link";

const ProfileCompletedPage = () => {
  const isTablet: any = useWindowIsTablet();

  return (
    <Box p="0.75rem" mb="3rem" textAlign="center" width="100%">
      <FlexBox justifyContent="center">
        <Icon size={isTablet ? 280 : 320}>story-set/Account-rafiki</Icon>
      </FlexBox>
      <H1 responsive textAlign="center" mb="1.25rem">
        Perfil Criado!
      </H1>
      <H2 responsive textAlign="center" mb="1.25rem">
      Já deixamos tudo preparado.
      </H2>
      <SemiSpan fontSize={isTablet ? "1rem" : "1.25rem"} textAlign="center">
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
