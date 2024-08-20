"use client";;
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography, { H2 } from "@component/Typography";
import APP_ROUTES from "@routes/app.routes";
import { useSupabaseContext } from "@supabaseutils/supabase.provider";
import { LOG } from "@utils/log";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function logLoginMessages(setMessage: any) {
  const messages = [
    "Configurando seu acesso...",
    "Carregando preferências do usuário...",
    "Estabelecendo conexão...",
  ];

  const maxTime = 3000; // Tempo máximo total em milissegundos
  const intervals: any[] = [];
  let totalAllocatedTime = 0;

  // Calcular intervalos aleatórios garantindo que a soma seja no máximo 3000ms
  for (let i = 0; i < messages.length; i++) {
    const remainingTime = maxTime - totalAllocatedTime;
    const remainingMessages = messages.length - i;
    const maxInterval = remainingTime / remainingMessages;

    const randomInterval = Math.random() * maxInterval;
    intervals.push(randomInterval);
    totalAllocatedTime += randomInterval;
  }

  // Logar as mensagens de acordo com os intervalos calculados
  function logMessage(index) {
    if (index < messages.length) {
      setTimeout(() => {
        LOG.debug(messages[index]);
        setMessage(messages[index]);
        logMessage(index + 1); // Chama a função para logar a próxima mensagem
      }, intervals[index]);
    }
  }

  logMessage(0); // Inicia o log das mensagens
}

const WelcomeBack = () => {
  const router = useRouter();
  const supabaseContext = useSupabaseContext();
  const [message, setMessage] = useState<string>("");

  const [timeoutAuth, setTimedOut] = useState<boolean>(false);

  const start = Date.now();

  // após 8 segundos redireciona para o Login
  setTimeout(() => {
    setTimedOut(true);
  }, 12000);

  // Chamar a função para começar o processo
  useEffect(() => {
    supabaseContext?.revalidate();
    logLoginMessages(setMessage);
  }, []);

  useEffect(() => {
    if (timeoutAuth && !supabaseContext?.auth?.isAuthenticated) {
      router.push(APP_ROUTES.AUTH.LOGIN);
    }
  }, [timeoutAuth]);

  useEffect(() => {
    if (supabaseContext?.auth?.isAuthenticated) {
      const elapsedTime = Date.now() - start;
      const delay = Math.max(2500 - elapsedTime, 0); // Garante que a página permaneça aberta por 3 segundos

      setTimeout(() => {
        router.push(APP_ROUTES.DASHBOARD.HOME);
      }, delay); // O redirecionamento acontecerá após o delay calculado
    }
  }, [supabaseContext?.auth?.isAuthenticated, router, start]);

  return (
    <>
      <H2 color="primary.main" textAlign="center" mt="2rem" mb="1rem">
        Oi, estamos preparando seu acesso!
      </H2>
      <Typography textAlign="center" mb="1rem" mt="2rem">
        {supabaseContext?.auth?.isAuthenticated ? (
          <b>"Bem Vindo! Login com sucesso!!!"</b>
        ) : (
          message
        )}
      </Typography>
      <FlexBox justifyContent="center">
        <Icon size="150">story-set/Cash-Payment-bro</Icon>
      </FlexBox>
    </>
  );
};

export default WelcomeBack;
0;
