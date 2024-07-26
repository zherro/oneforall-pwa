import ProfileRepository from "@supabaseutils/repositories/profile.repository";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const respository = new ProfileRepository();
    const { data, error } = await respository.findById(params?.uuid);

    LOG.debug(`Getting profile by uuid: ${params?.uuid}`, error);
    if (error) {
      LOG.error("Erron when get profiles", error);
      return httpResponse.error();
    }
    return httpResponse.ok(data);
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}
