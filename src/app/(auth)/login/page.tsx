import { Suspense } from "react";
import LoginView from "./view";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginView />
    </Suspense>
  );
};

export default LoginPage;
