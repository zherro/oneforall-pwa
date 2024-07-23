"use client";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography from "@component/Typography";
import { fetchGet } from "@hook/useFetch2";
import StringUtils, { notBlank } from "@utils/helpers/String.utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ConfirmEmailContent = () => {
  const URI = "";
  const [data, handleData] = useState<any>();
  const [error, handleError] = useState<any>();
  const [loading, onLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("Validando credenciais...");

  const query = useSearchParams();

  useEffect(() => {
    if (notBlank(query.get("token")) && notBlank(query.get("code"))) {
      fetchGet(URI, {
        notify: true,
        headers: {},
        handleData,
        handleError,
        onLoading,
      });
      setMsg("Validando credenciais...");
    } else {
      setMsg("Ooops! Informações inválidas!");
    }
  }, [query]);

  return (
    <>
      <FlexBox justifyContent="center" mt="2rem">
        <Icon size="260px">story-set/Account-rafiki</Icon>
      </FlexBox>
      <Typography textAlign="center" fontSize="1.45rem" mt="2rem">
        {msg}
      </Typography>
    </>
  );
};

const ConfirmEmail = () => {
  return (
    <Suspense fallback={<></>}>
      <ConfirmEmailContent />
    </Suspense>
  );
};
export default ConfirmEmail;
