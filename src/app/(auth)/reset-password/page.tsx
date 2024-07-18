import { useSearchParams } from "next/navigation";
import { recovery } from "../actions-mailer";
import ResetPassword from "@sections/auth/ResetPassword";
import { isEmpty } from "@utils/helpers/String.utils";

const ResetPasswordPage = () => {
  const query = useSearchParams();
  const token = query.get("token");
  const hasToken = !isEmpty(token);


  return <ResetPassword formAction={hasToken ? updatePassword : recovery} />;
};

export default ResetPasswordPage;
