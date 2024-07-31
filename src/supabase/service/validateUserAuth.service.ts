import { BusinessException } from "@supabaseutils/bussines.exception";
import { UserData } from "@supabaseutils/model/user/UserData";
import SessionUtils from "@supabaseutils/session";
import HttpStatusCode from "@utils/http/HttpStatusCode";

class ValidateUserAuth {
  private session;
  constructor(userData: UserData) {
    this.session = new SessionUtils(userData);
  }

  public isAuthenticated() {
    if (this.session.isAuthenticated()) return this;

    throw new BusinessException(
      "Faça login para continuar!",
      HttpStatusCode.UNPROCESSABLE_ENTITY
    );
  }

  public get() {
    return {
      tenant: this.session.getTenant(),
      userId: this.session.getUser()?.id,
    };
  }
}

const validateUserAuth = (userData) => new ValidateUserAuth(userData);
export default validateUserAuth;
