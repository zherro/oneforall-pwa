"use client"
import Box from "@component/Box";
import Typography, { H2 } from "@component/Typography";
import Icon from "@component/icon/Icon";
import { useLaraTheme } from "@context/app-context/AppContext";
import useFetch from "@hook/useFetch";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const fetchData = useFetch();
  const router = useRouter();
  const theme = useLaraTheme();

  const [error, setError] = useState<string | null>(null);

  const successCallback = (data: any) => {
    router.push(APP_ROUTES.DASHBOARD.HOME);
  };

  const errorCallback = (error: any) => {
    setError(error?.message);
  };

  useEffect(() => {
    fetchData(
      API_ROUTES.USER.PROFILE_CONFIGURE,
      {},
      successCallback,
      errorCallback
    );
  }, []);

  return (
    <>
      <Box>
        {error == null && (
          <H2 textAlign="center">Estamos preparando tudo pra você...</H2>
        )}
        {error != null && (
          <Box>
            <Typography
              textAlign="center"
              backgroundColor={theme.colors.error.light}
              fontSize="0.95rem"
              p="0.75rem"
              mb="1rem"
            >
              Ops!
            </Typography>
            <Typography
              textAlign="center"
              backgroundColor={theme.colors.error.light}
              fontSize="0.95rem"
              p="0.75rem"
              mb="1rem"
            >
              {error}
            </Typography>
          </Box>
        )}
        <Icon defaultcolor="red" size="100%">
          story-set/gathu/tablet-login-rafiki
        </Icon>
      </Box>
    </>
  );
};

export default page;
