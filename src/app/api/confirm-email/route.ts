// import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
// import { isEmpty } from "@utils/helpers/String.utils";
// import httpResponse from "@utils/http/HttpResponse";
// import HttpStatusCode from "@utils/http/HttpStatusCode";
// import { LOG } from "@utils/log";
// import { type NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);

//     const code = searchParams.get("code");
//     const email = searchParams.get("email");
//     const token = searchParams.get("token");

//     if (isEmpty(code) || isEmpty(email) || isEmpty(token)) {
//       return httpResponse.status(HttpStatusCode.BAD_REQUEST).message("");
//     }

//     const repository = new ProfileRecoveryRepository();

//     repository.findResetHashByCodeAndEmail(code, email);

//     return new Response(JSON.stringify(data), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     LOG.error("Error processing request:", error);

//     // Return an error response
//     return new Response(
//       JSON.stringify({
//         statusCode: 500,
//         message: "Não conseguimos completar as solicitação!",
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
