import SupabaseRepository from "@supabaseutils/types/repository";
import StringUtils from "@utils/helpers/String.utils";
import { LOG } from "@utils/log";

export default class ProfileRepository extends SupabaseRepository<any> {
  constructor() {
    super("profiles");
  }

  getByEmail(email: string | undefined) {
    return this.from.select().eq("email", email).limit(1);
  }

}
