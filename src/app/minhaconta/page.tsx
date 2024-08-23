"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Typography, { H2, SemiSpan } from "@component/Typography";
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
      <H2>Olá, {context?.auth.session?.userMetaData().name}</H2>
      {JSON.stringify(onboard)}
      <Grid container splited>
        <Grid item xs={12}>
          <Box>
            {onboard?.steps?.map((step, idx) => (
              <Box
                my="0.5rem"
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
                      <div
                        style={{
                          border: "solid 1px #cdcdcd",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          marginTop: "5px",
                          marginRight: "0.5rem",
                        }}
                      ></div>
                    )}
                    <Typography
                      fontWeight="500"
                      style={
                        step.completed ? { textDecoration: "line-through" } : {}
                      }
                    >
                      {step.title}
                    </Typography>
                  </FlexBox>
                  <SemiSpan>{step.description}</SemiSpan>
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
