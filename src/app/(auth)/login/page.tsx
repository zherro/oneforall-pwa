import { Suspense } from "react";
import LoginView from "./view";

const LoginPage = () => {
  return (
    <Suspense fallback={<></>}>
      <LoginView />
    </Suspense>
  );
};

export default LoginPage;
