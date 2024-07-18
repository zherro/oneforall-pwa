import ResetPassword from "@sections/auth/ResetPassword";
import { validateResetCredentials } from "../actions-security";
import ResetPasswordPage from "../reset-password/page";

const NewPasswordPage = () => {
  return <ResetPassword formAction={validateResetCredentials} />;
};

export default NewPasswordPage;
