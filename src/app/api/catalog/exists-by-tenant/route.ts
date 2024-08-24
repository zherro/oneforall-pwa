import CategoriesRepository from "@supabaseutils/repositories/catalog/Categories.repository";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const respository = new CategoriesRepository();

  try {
    const exists = await respository.existsByTenant();

    if (!exists) {
      return httpResponse.error();
    }

    return httpResponse.ok({
      exists: true,
    });
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}
