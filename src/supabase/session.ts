import { CompanyTenantyDTO } from "@supabaseutils/model/dto/CompanyTenanty.dto";
import ObjectUtils from "../utils/helpers/Object.utils";
import { UserMetaData } from "./model/user/UserData";

export default class SessionUtils {
  private session: any;

  constructor(session: any) {
    this.session = session;
  }

  isAuthenticated() {
    return (
      this.session?.aud == "authenticated" &&
      ObjectUtils.nonNull(this.session?.email_confirmed_at) &&
      this.session?.is_anonymous == false
    );
  }

  getUser(): any {
    return this.session || {};
  }

  getTenant(): CompanyTenantyDTO {
    return this.userMetaData()?.tenant || {};
  }

  isConfirmed(): boolean {
    return ObjectUtils.nonNull(this.session?.email_confirmed_at);
  }

  isCompleted(): boolean {
    return this.userMetaData()?.completed || false;
  }

  userMetaData(): UserMetaData {
    return this.session?.user_metadata;
  }
}
