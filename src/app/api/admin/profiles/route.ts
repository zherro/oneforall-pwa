import ProfileRepository from "@supabaseutils/repositories/profile.repository";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page: number = +(searchParams.get("page") || 1);
    const size: number = +(searchParams.get("size") || 0);
    const tsv_search: string = searchParams.get("search") || "";

    const respository = new ProfileRepository();

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
