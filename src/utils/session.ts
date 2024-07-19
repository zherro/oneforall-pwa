import { CompanyTenantyDTO } from "@supabaseutils/model/dto/CompanyTenanty.dto";
import ObjectUtils from "./helpers/Object.utils";

export const sessionTenant = (session: any): CompanyTenantyDTO =>
  session?.user?.user_metadata?.tenant;

export default class SessionUtils {
  private session: any;

  constructor(session: any) {
    this.session = session;
  }

  isAuthenticated() {
    return ObjectUtils.nonNull(this.session?.user);
  }

  getTenant(): CompanyTenantyDTO {
    return this.session?.user?.user_metadata?.tenant || {};
  }
}

export const isAuthenticated = (session: any) =>
  new SessionUtils(session).isAuthenticated();
