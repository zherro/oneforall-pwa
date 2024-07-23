"use client";
import ResetPassword from "@sections/auth/ResetPassword";
import { validateResetCredentials } from "../actions-security";
import ResetPasswordPage from "../reset-password/page";
import { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<></>}>
      <ResetPassword formAction={validateResetCredentials} />
    </Suspense>
  );
};

export default NewPasswordPage;
