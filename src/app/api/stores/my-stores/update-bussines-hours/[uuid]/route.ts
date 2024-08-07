import ConfigProductTableRepository from "@supabaseutils/repositories/ConfigProductTable.repository";
import StoreRepository from "@supabaseutils/repositories/Store.repository";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const respository = new StoreRepository();
    const { data, error } = await respository.findById(params?.uuid);

    LOG.debug(`Getting profile bussines hour: ${params?.uuid}`, error);
    if (error) {
      LOG.error("Erron when get profiles", error);
      return httpResponse.error();
    }
    return httpResponse.ok(data?.business_hours);
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const formData = await request.json();
    const repository = new StoreRepository();
    const { data, error } = await repository.findById(params?.uuid);

    const { error: erro_save } = await repository.save({
      ...data,
      business_hours: formData,
    });

    if (error || erro_save) {
      LOG.error("Erron when save stores", error || erro_save);
      return httpResponse.error();
    }

    return httpResponse.accepted();
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}
