import Recovery from "@sections/auth/Recovery";
import { signup } from "../actions";

const RecoveryPassPage = () => {
  return <Recovery formAction={signup} />;
};

export default RecoveryPassPage;
