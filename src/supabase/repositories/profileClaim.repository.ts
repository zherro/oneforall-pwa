import { BusinessException } from "@supabaseutils/bussines.exception";
import { CLAIMS } from "@supabaseutils/grants/claims";
import ProfileClaimModel from "@supabaseutils/model/ProfileClaim.model";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import SupabaseRepository from "@supabaseutils/types/repository";
import { LOG } from "@utils/log";

export default class ProfileClaimRepository extends SupabaseRepository<ProfileClaimModel> {
  constructor() {
    super("profile_claims");
  }

  async enableFreePlan() {
    const userId = await this.getUserId();
    console.log(userId)

    const { data } = await this.from
      .select("id")
      .eq("user_id", userId)
      .eq("claim", CLAIMS.FREE_PLAN)
      .eq("status", StatusEntity.ACTIVE)
      .single();

    const enablePLan = {
      id: data?.id,
      claim: CLAIMS.FREE_PLAN,
      status: StatusEntity.ACTIVE,
      user_id: userId,
    };

    const { error } = await this.from.upsert(enablePLan);

    if (error) {
      LOG.error("Active FREE PLAN ERROR :::: ", error);
      throw new BusinessException(
        "Houve um erro ao tentar ativar seu plano. Fale com nosso suporte!"
      );
    }
  }
}
