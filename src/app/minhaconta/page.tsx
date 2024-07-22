"use client"
import { H1 } from "@component/Typography";
import { useSession } from "@supabaseutils/supabase.provider";

const MyAccountHomePage = () => {
  const { session, isCompleted } = useSession();

  return (
    <>
      <H1>Olá, </H1>
      {JSON.stringify(session)}
      {''+isCompleted}
    </>
  );
};

export default MyAccountHomePage;
