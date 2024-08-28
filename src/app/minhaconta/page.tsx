"use client";
import Box from "@component/Box";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Typography, {
  H2,
  H3,
  H4,
  H5,
  H6,
  SemiSpan,
} from "@component/Typography";
import { fetchGet } from "@hook/useFetch2";
import { API_ROUTES } from "@routes/app.routes";
import { useSupabaseContext } from "@supabaseutils/supabase.provider";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyAccountHomePage = () => {
  const context = useSupabaseContext();

  const URI = API_ROUTES.USER.PROFILE_ONBOARD;
  const [onboard, handleData] = useState<any>([]);
  const [loading, onLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!context?.auth.session.onboardCompleted()) {
      fetchGet(URI, {
        handleData,
        onLoading,
      });
    }
  }, [context?.auth.session]);

  return (
    <>
      <Grid container splited>
        <Grid item xs={12}>
          <Box my="1.5rem">
            <Typography>
              Olá, {context?.auth?.session?.userMetaData()?.first_name || ""}
            </Typography>
            <Divider bg="gray.400" />
          </Box>
        </Grid>
      </Grid>
      {
        // JSON.stringify()
      }
      <Grid container splited>
        <Grid item xs={12}>
          <Box
            border="1px solid"
            borderRadius="6px"
            p="0.75rem"
            shadow={3}
            borderColor="gray.400"
            mb="2rem"
          >
            <H2 mb="1rem" color="primary.main">
              Falta Pouco!!
            </H2>
            <SemiSpan textAlign="justify">
              Agora você só precisa configurar a sua loja para começar a vender
              ainda hoje!
            </SemiSpan>
            <Box mt="0.5rem" />
            <SemiSpan textAlign="justify" mt="0.5rem">
              Preparamos uma listinha para você seguir o passo a passo, para
              configurar sua loja e desbloquear todos os recursos.
            </SemiSpan>
          </Box>
          <Box>
            {onboard?.steps?.map((step, idx) => (
              <Box
                mt="0.5rem"
                mb="1.5rem"
                borderBottom="1px solid"
                borderColor="gray.300"
                pb="0.5rem"
              >
                <Link href={step.completed ? "#" : step.link}>
                  <FlexBox>
                    {step.completed ? (
                      <Icon size={14} mt="4px" mr="0.5rem" color="success">
                        fa/solid/circle-check
                      </Icon>
                    ) : (
                      <Icon
                        size={14}
                        mt="4px"
                        mr="0.5rem"
                        defaultcolor="gray.400"
                      >
                        fa/solid/circle-check
                      </Icon>
                    )}
                    <Typography
                      color="secondary.main"
                      fontWeight="500"
                      style={
                        step.completed ? { textDecoration: "line-through" } : {}
                      }
                    >
                      {step.title}
                    </Typography>
                  </FlexBox>
                  <SemiSpan>{step.description}</SemiSpan>

                  <FlexBox justifyContent="end" mb="0.5rem">
                    <SemiSpan
                      textAlign="right"
                      color="primary.main"
                      borderBottom="1px solid"
                      fontSize="0.85rem"
                    >
                      {"configurar >>"}
                    </SemiSpan>
                  </FlexBox>
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MyAccountHomePage;
