"use client";;
import { useSearchParams } from "next/navigation";
import ResetPassword from "@sections/auth/ResetPassword";
import { isEmpty } from "@utils/helpers/String.utils";
import { updatePassword, validateResetCredentials } from "../actions-security";

const ResetPasswordPage = () => {
  const query = useSearchParams();
  const token = query.get("token");
  const hasToken = !isEmpty(token);

  return <ResetPassword formAction={hasToken ? updatePassword : validateResetCredentials} />;
};

export default ResetPasswordPage;
