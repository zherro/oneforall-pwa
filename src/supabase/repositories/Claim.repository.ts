import SupabaseRepository from "@supabaseutils/types/repository";

export default class ClaimRepository extends SupabaseRepository<any> {
  constructor(supabase?: any) {
    super("", supabase);
  }

  async isAdmin() {
    const { data, error } = await this.supabase.rpc("is_claims_admin");
    console.log(data)
    return data;
  }
}
