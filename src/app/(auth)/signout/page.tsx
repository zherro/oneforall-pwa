"use client";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography, { H2 } from "@component/Typography";
import APP_ROUTES from "@routes/app.routes";
import { useSupabaseContext } from "@supabaseutils/supabase.provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WelcomeBack = () => {
  const router = useRouter();
  const context = useSupabaseContext();
  const [message, setMessage] = useState<string>("Encerrando sessão...");

  const [timeoutAuth, setTimedOut] = useState<boolean>(false);

  const start = Date.now();

  // após 8 segundos redireciona para o Login
  setTimeout(() => {
    setTimedOut(true);
  }, 12000);

  // Chamar a função para começar o processo
  useEffect(() => {
    context?.revalidate();
  }, []);

  useEffect(() => {
    if (timeoutAuth && !context?.auth?.isAuthenticated) {
      router.push(APP_ROUTES.AUTH.LOGIN);
    }
  }, [timeoutAuth]);

  useEffect(() => {
    if (!context?.auth?.isAuthenticated) {
      setMessage("Logout concluido!");
      setTimeout(() => {
        router.push(APP_ROUTES.AUTH.LOGIN);
      }, 3500); // O redirecionamento acontecerá após o delay calculado
    }
  }, [context?.auth?.isAuthenticated, router, start]);

  return (
    <>
      <H2 color="primary.main" textAlign="center" mt="2rem" mb="1rem">
        Um momento!
      </H2>
      <Typography textAlign="center" mb="1rem" mt="2rem">
        {message}
      </Typography>
      <FlexBox justifyContent="center">
        <Icon size="150">story-set/Done-pana</Icon>
      </FlexBox>
    </>
  );
};

export default WelcomeBack;
