import { BusinessException } from "@supabaseutils/bussines.exception";
import SupabaseRepository from "@supabaseutils/types/repository";
import HttpStatusCode from "@utils/http/HttpStatusCode";

export default class ProfileRepository extends SupabaseRepository<any> {
  constructor() {
    super("profiles");
  }

  getByEmail(email: string | undefined) {
    return this.from.select().eq("email", email).limit(1);
  }

  async getMyProfile() {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    if (user == null || user == undefined) {
      throw new BusinessException(
        "Usuário não registrado!",
        HttpStatusCode.CONFLICT
      );
    }

    const { data, error } = await this.from
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error) {
      throw new BusinessException(
        "Não conseguimos ecnontrar sua conta! Se o problema continuar, contate nosso suporte."
      );
    }

    return data;
  }
}
