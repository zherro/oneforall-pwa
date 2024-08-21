"use client";
import { H2 } from "@component/Typography";
import { fetchGet } from "@hook/useFetch2";
import { API_ROUTES } from "@routes/app.routes";
import { useSupabaseContext } from "@supabaseutils/supabase.provider";
import { useEffect, useState } from "react";

const MyAccountHomePage = () => {
  const context = useSupabaseContext();

  const URI = API_ROUTES.USER.PROFILE_ONBOARD;
  const [onboard, handleData] = useState<any>();
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
    </>
  );
};

export default MyAccountHomePage;
