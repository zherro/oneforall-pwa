import CategoriesRepository from "@supabaseutils/repositories/catalog/Categories.repository";
import validateUserAuth from "@supabaseutils/service/validateUserAuth.service";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const repository = new CategoriesRepository();
    const formData = await request.json();

    const { tenant } = validateUserAuth(await repository.getUser()).get();
    formData.tenant_id = tenant.id;

    LOG.debug("formData", formData);
    const { error } = await repository.save(formData);

    if (error) {
      LOG.error("Erron when save stores", error);
      return httpResponse.error();
    }

    return httpResponse.accepted();
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}
