import SupabaseRepository from "@supabaseutils/types/repository";
import { LOG } from "@utils/log";

export default class TenantRepository extends SupabaseRepository<any> {
  constructor() {
    super("tenants");
  }

  async userHasTenant(uuid: string): Promise<any> {
    const user = await this.getUser();
    const {error, data} = await this.findByTenant(uuid).eq("user_id", user.id);
    
    if (error || data?.length <= 0) {
      if(error) LOG.error("Error on verify tenant", error);
      return null;
    }

    return user;
    
  }
}
