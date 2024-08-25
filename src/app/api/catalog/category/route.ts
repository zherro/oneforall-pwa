import { CrudService } from "@supabaseutils/Crud.service";
import CategoriesRepository from "@supabaseutils/repositories/catalog/Categories.repository";
import ClaimRepository from "@supabaseutils/repositories/Claim.repository";
import TenantRepository from "@supabaseutils/repositories/Tenant.repository";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const respository = new CategoriesRepository();

  try {
    const { searchParams } = new URL(request.url);
    const page: number = +(searchParams.get("page") || 1);
    let size: number = +(searchParams.get("size") || 20);
    size = size > 30 ? 30 : size;
    const tsv_search: string = searchParams.get("search") || "";

    const { data, error, count } = await respository.paginatedWithTenantOnly(
      page,
      size,
      {
        tsv_search,
      }
    );

    if (error) {
      LOG.error("Erron when list profiles", error);
      return httpResponse.error();
    }

    return httpResponse.ok({
      data,
      page,
      size,
      total: count,
    });
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}

export async function POST(request: NextRequest) {
  const repository = new CategoriesRepository();

  const { error: errorOnboard } = await repository.updateOnboard(
    "start_catalog"
  );
  LOG.debug("ERROR OBOARD", errorOnboard);

  LOG.debug("Is ADMIN", await new ClaimRepository().isAdmin());
  const service = new CrudService(repository);
  return service.createOrUpdateWithTenant(request);
}
