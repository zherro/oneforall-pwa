import { cardapioSearchUseCase } from "@supabaseutils/use-cases/cardapioProductSearch.usecase";
import { IngestionDataBuilder } from "@supabaseutils/use-cases/processor/ingestion-data";
import httpResponse from "@utils/http/HttpResponse";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    const output = await cardapioSearchUseCase(
      IngestionDataBuilder.of().addInput(query).build()
    );

    console.log(output)

    if (output.errors.length > 0) {
      throw output.errors[0];
    }

    return httpResponse.ok(output.output);
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.errorHandler(error);
  }
}
