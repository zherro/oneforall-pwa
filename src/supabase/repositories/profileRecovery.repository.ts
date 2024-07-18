import ProfileRecoveryModel from "@supabaseutils/model/ProfileRecovery.model";
import SupabaseRepository from "@supabaseutils/types/repository";

export default class ProfileRecoveryRepository extends SupabaseRepository<ProfileRecoveryModel> {
  constructor() {
    super("profile_recovery");
  }

  public findResetHashByCodeAndEmail(code: string, email: string) {
    // Calcula a data e hora que representa 6 horas atrás
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();

    return this.from
      .select("recovery_hash")
      .eq("email", email)
      .eq("code", code)
      .is("created_at", null)
      .gt("used_at", sixHoursAgo)
      .limit(1);
  }
}
