import Recovery from "@sections/auth/Recovery";
import { recovery } from "../actions-mailer";
import { Suspense } from "react";

const RecoveryPassPage = () => {
  return (
    <Suspense fallback={<></>}>
      <Recovery formAction={recovery} />
    </Suspense>
  );
};

export default RecoveryPassPage;
