import TicketsRepository from "@supabaseutils/repositories/tickets.repository";
import { LOG } from "@utils/log";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const repository = new TicketsRepository();

    const ticket = await request.json();
    const { error } = await repository.save(ticket);

    if (error) throw error;

    return new Response(JSON.stringify({}), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return new Response(
      JSON.stringify({
        statusCode: 500,
        message: "Não conseguimos completar as solicitação!",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
