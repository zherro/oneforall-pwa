"use client";
import { H2 } from "@component/Typography";
import { useSession } from "@supabaseutils/supabase.provider";

const MyAccountHomePage = () => {
  const { session, isCompleted } = useSession();

  return (
    <>
      <H2>Olá, {session?.user_metadata.first_name}</H2>
      {JSON.stringify(session)}
      {"" + isCompleted}
    </>
  );
};

export default MyAccountHomePage;
