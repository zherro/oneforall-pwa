import StoreRepository from "@supabaseutils/repositories/Store.repository";
import TenantRepository from "@supabaseutils/repositories/Tenant.repository";
import httpResponse from "@utils/http/HttpResponse";
import HttpStatusCode from "@utils/http/HttpStatusCode";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const repository = new StoreRepository();
    const tenantRepository = new TenantRepository();

    const user: any = await tenantRepository.userHasTenant(params?.uuid);

    if (user == null) {
      LOG.error("User not found");
      return httpResponse.error(
        HttpStatusCode.BAD_REQUEST,
        "Credenciais inválidas!"
      );
    }

    const { data, error } = await repository
      .findByTenant(params?.uuid)
      .single();

    if (error) {
      LOG.error("Erron when get profiles", error);
      return httpResponse.error();
    }

    await repository.getSupabase().auth.updateUser({
      data: {
        tenant: { ...data, type: "store" },
      },
    });

    return httpResponse.ok(data);
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}
