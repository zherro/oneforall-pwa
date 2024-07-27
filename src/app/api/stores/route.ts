import StoreRepository from "@supabaseutils/repositories/Store.repository";
import { createClient } from "@supabaseutils/utils/server";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {

    const repository = new StoreRepository();

    const formData = await request.json();
    formData.user_id = await repository.getUserId();

    LOG.debug('formData', formData);
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



export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page: number = +(searchParams.get("page") || 1);
    let size: number = +(searchParams.get("size") || 20);
    size = size > 30 ? 30 : size;
    const tsv_search: string = searchParams.get("search") || "";

    const respository = new StoreRepository();

    const { data, error, count } = await respository.paginated(page, size, {
      tsv_search,
    });

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
