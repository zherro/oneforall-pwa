import ProfileClaimRepository from "@supabaseutils/repositories/profileClaim.repository";
import httpResponse from "@utils/http/HttpResponse";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const repository = new ProfileClaimRepository();
    await repository.enableFreePlan();

    return httpResponse.accepted();
  } catch (error) {
    return httpResponse.errorHandler(error);
  }
}
