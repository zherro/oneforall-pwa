import { BusinessException } from "@supabaseutils/bussines.exception";
import UpdateCategoryStatus from "@supabaseutils/model/dto/request/UpdateCategoryStatus.dto";
import SupabaseRepository from "@supabaseutils/types/repository";
import HttpStatusCode from "@utils/http/HttpStatusCode";
import { LOG } from "@utils/log";

export default class CategoriesRepository extends SupabaseRepository<any> {
  constructor() {
    super("categories");
  }

  async existsByTenant(): Promise<boolean> {
    const tenantId = await this.getTenantId();

    const { count, error } = await this.from
      .select("id", { count: "exact" }) // Use exact count to get the number of matching rows
      .eq("deleted", false)
      .eq("tenant_id", tenantId)
      .limit(1); // Limit to 1 for performance

    if (error) {
      LOG.error("m=existsByTenant, error to verifiy in exists category by tenants", error);
      throw new BusinessException(
        `Não conseguimos completar a solicitação.: ${error.message}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return (count || 0) > 0;
  }

  async updateCategoryStatus(update: UpdateCategoryStatus) {
    const { error } = await this.from
      .update({ status: update.status })
      .eq("id", update.categoryId)
      .eq("tenant_id", await this.getTenantId());

    if (error) {
      LOG.error("m=updateCategoryStatus, error to update category status", error);
      throw new BusinessException(
        `Não foi possivel alterar o status da categoria.`,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
