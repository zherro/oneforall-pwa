import ProfileRecoveryModel from "@supabaseutils/model/ProfileRecovery.model";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import SupabaseRepository from "@supabaseutils/types/repository";

export default class ProfileRecoveryRepository extends SupabaseRepository<ProfileRecoveryModel> {
  constructor() {
    super("profile_recovery");
  }

  public findResetHashByCodeAndEmail(code: string, email: string) {
    return this.from
      .select("id, recovery_hash, created_at, user_id")
      .eq("email", email)
      .eq("recovery_code", code)
      .eq("status", StatusEntity.ACTIVE)
      .single();
  }

  async resetOldRecoveries(id: any) {
    await this.from
      .update({ status: StatusEntity.SUSPENSE })
      .neq("id", id)
      .eq("status", StatusEntity.ACTIVE);
  }
}
