import Recovery from "@sections/auth/Recovery";
import { recovery } from "../actions-mailer";

const RecoveryPassPage = () => {
  return <Recovery formAction={recovery} />;
};

export default RecoveryPassPage;
