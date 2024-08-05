import ProfileRepository from "@supabaseutils/repositories/profile.repository";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const repository = new ProfileRepository();
    const profile = await repository.getMyProfile();

    LOG.debug("Recovered profile:", profile);
    return httpResponse.ok(profile);
  } catch (error: any) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error(error);
  }
}


export async function PATCH(request: NextRequest) {
  try {
    const repository = new ProfileRepository();
    const profile = await repository.getMyProfile();

    LOG.debug("Recovered profile:", profile);
    return httpResponse.ok(profile);
  } catch (error: any) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error(error);
  }
}
