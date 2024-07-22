"use client";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { H2, H3, H4, SemiSpan } from "@component/Typography";
import { useLaraTheme } from "@context/app-context/AppContext";
import styled from "styled-components";

const ChoseYourPlan = () => {
  const theme = useLaraTheme();

  // styled components
  const ChoseBox = styled(Box)({
    border: `solid 1px ${theme.colors.primary.main}`,
    borderRadius: "5px",
    width: "680px",
    maxWidth: "100%",
    padding: "0.5rem",
    margin: "0.75rem 10px",
  });

  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <FlexBox
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mx="0.75rem"
          >
            <H2>Escolha um PLANO para começar agora mesmo!</H2>
            <ChoseBox>
              <H3>Gratuito</H3>
              <SemiSpan>
                Este plano é ideial para quem está começando, ou quer
                experimentar as funcionalidades basicas da plataforma!
              </SemiSpan>
              <Button mt="1rem" bg="primary.main" color="white">
                Quero o plano Gratuito
              </Button>
            </ChoseBox>

            <ChoseBox>
              <H3>Plano Padrão</H3>
              <SemiSpan>
                Este plano te dará ferramentas indispensaveis para um controle
                mais preciso do seu négocio, além de facilitar a autmação de
                inumeras tarefas.
              </SemiSpan>
              <Button disabled mt="1rem" bg="primary.main" color="white">
                EM BREVE
              </Button>
            </ChoseBox>

            <ChoseBox>
              <H3>Plano Bussines</H3>
              <SemiSpan>
                Tenha acesso a estatisticas, dicas e muitas outras vantages
              </SemiSpan>
              <Button disabled mt="1rem" bg="primary.main" color="white">
                EM BREVE
              </Button>
            </ChoseBox>
          </FlexBox>
        </Grid>
      </Grid>
    </>
  );
};

export default ChoseYourPlan;
