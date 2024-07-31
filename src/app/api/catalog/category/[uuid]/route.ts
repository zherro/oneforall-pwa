import { CrudService } from "@supabaseutils/Crud.service";
import ClaimRepository from "@supabaseutils/repositories/Claim.repository";
import CategoriesRepository from "@supabaseutils/repositories/catalog/Categories.repository";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const repository = new CategoriesRepository();

  LOG.debug("Is ADMIN", await new ClaimRepository().isAdmin());
  const service = new CrudService(repository);
  return service.getById(params.uuid);
}
