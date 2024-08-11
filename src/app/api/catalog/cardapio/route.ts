import { cardapioUseCase } from "@supabaseutils/use-cases/cardapio.usecase";
import { IngestionDataBuilder } from "@supabaseutils/use-cases/processor/ingestion-data";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const output = await cardapioUseCase(new IngestionDataBuilder().build());
    return httpResponse.ok(output.output);
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.errorHandler(error);
  }
}
