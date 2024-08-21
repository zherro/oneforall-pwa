import { BusinessException } from "@supabaseutils/bussines.exception";
import SupabaseRepository from "@supabaseutils/types/repository";
import HttpStatusCode from "@utils/http/HttpStatusCode";
import { LOG } from "@utils/log";

export default class ProfileOnboardRepository extends SupabaseRepository<any> {
  constructor() {
    super("profiles_onboard");
  }

  getByEmail(email: string | undefined) {
    return this.from.select().eq("email", email).limit(1);
  }

  async getMyOnboard() {
    const userId = await this.getUserId();

    if (userId == null || userId == undefined) {
      throw new BusinessException(
        "Usuário não registrado!",
        HttpStatusCode.CONFLICT
      );
    }

    const { data, error } = await this.from
      .select("*")
      .eq("user_id", userId)
      .eq("status", "A")
      .single();

    if (error) {
      LOG.error("m=getMyProfile, error: ", error);
      throw new BusinessException(
        "Não conseguimos ecnontrar sua conta! Se o problema continuar, contate nosso suporte.",
        HttpStatusCode.CONFLICT
      );
    }

    return data;
  }
}
