import ProfileOnboardRepository from "@supabaseutils/repositories/profileOnboard.repository";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const repository = new ProfileOnboardRepository();
    const onboard = await repository.getMyOnboard();

    LOG.debug("Recovered profile:", onboard);
    return httpResponse.ok(onboard);
  } catch (error: any) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.errorHandler(error);
  }
}
