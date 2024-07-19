import { CompanyTenantyDTO } from "@supabaseutils/model/dto/CompanyTenanty.dto";
import ObjectUtils from "../utils/helpers/Object.utils";

export const sessionTenant = (session: any): CompanyTenantyDTO =>
  session?.user?.user_metadata?.tenant;

export default class SessionUtils {
  private session: any;
  private user: any;

  constructor(session: any) {
    this.session = session;
    this.user = this.session?.user || this.session?.data?.user;
  }

  isAuthenticated() {
    return (
      this.user?.aud == "authenticated" &&
      ObjectUtils.nonNull(this.user?.email_confirmed_at) &&
      this.user?.is_anonymous == false
    );
  }

  getUser(): any {
    return this.user || {};
  }

  getTenant(): CompanyTenantyDTO {
    return this.session?.user?.user_metadata?.tenant || {};
  }
}