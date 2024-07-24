"use client";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography from "@component/Typography";
import { fetchPost } from "@hook/useFetch2";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { notBlank } from "@utils/helpers/String.utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const ConfirmEmailContent = () => {
  const URI = API_ROUTES.USER.CONFIRM_EMAIL;
  const [error, handleError] = useState<any>();
  const [loading, onLoading] = useState<boolean>(true);
  const [validated, setValidated] = useState<boolean>(false);

  const query = useSearchParams();
  const [msg, setMsg] = useState<string>(
    `Deseja confirmar o ${query.get("email")} ?`
  );

  const validateEmail = () => {
    if (
      notBlank(query.get("token")) &&
      notBlank(query.get("code")) &&
      notBlank(query.get("email"))
    ) {
      fetchPost(
        `${URI}?token=${query.get("token")}&code=${query.get(
          "code"
        )}&email=${query.get("email")}`,
        { a: "b" },
        {
          notify: true,
          headers: {},
          handleData: (data) => {
            setValidated(true);
            setMsg("Tudo Certo!");
            onLoading(false);
          },
          handleError,
          onLoading,
        }
      );
      setMsg("Validando credenciais...");
    } else {
      setMsg("Ooops! Informações inválidas!");
    }
  };

  return (
    <>
      <FlexBox justifyContent="center" mt="2rem">
        <Icon size="260px">story-set/Account-rafiki</Icon>
      </FlexBox>
      <Typography textAlign="center" fontSize="1.45rem" mt="2rem">
        {loading || validated ? msg : error?.message}
      </Typography>
      <FlexBox justifyContent="center" mt="2rem">
        {!validated && loading && (
          <Button
            color="white"
            bg="primary.main"
            onClick={() => validateEmail()}
          >
            Confirmar Email
          </Button>
        )}
        {validated && !loading && (
          <Link href={APP_ROUTES.AUTH.LOGIN}>
            <Button color="white" bg="primary.main">
              Login
            </Button>
          </Link>
        )}
        {!validated && !loading && (
          <>
            <Link href={APP_ROUTES.AUTH.LOGIN}>
              <Button color="white" bg="primary.main">
                Login
              </Button>
            </Link>
            <Link href={APP_ROUTES.SUPORT.FORM}>
              <Button ml="2rem" color="white" bg="primary.main">
                Preciso de Ajuda
              </Button>
            </Link>
          </>
        )}
      </FlexBox>
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
