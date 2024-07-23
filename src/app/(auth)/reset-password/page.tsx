"use client";
import { useSearchParams } from "next/navigation";
import ResetPassword from "@sections/auth/ResetPassword";
import { isEmpty } from "@utils/helpers/String.utils";
import { updatePassword, validateResetCredentials } from "../actions-security";
import { Suspense } from "react";

const ResetPasswordPageContent = () => {
  const query = useSearchParams();
  const token = query.get("token");
  const hasToken = !isEmpty(token);

  return (
    <ResetPassword
      formAction={hasToken ? updatePassword : validateResetCredentials}
    />
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<></>}>
      <ResetPasswordPageContent />
    </Suspense>
  );
};

export default ResetPasswordPage;
