import MESSAGES from "@data/messages";
import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
import UserRepository from "@supabaseutils/repositories/user.repository";
import ObjectUtils from "@utils/helpers/Object.utils";
import { isEmpty } from "@utils/helpers/String.utils";
import httpResponse from "@utils/http/HttpResponse";
import HttpStatusCode from "@utils/http/HttpStatusCode";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code") || "";
    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    if (isEmpty(code) || isEmpty(email) || isEmpty(token)) {
      LOG.debug("searchParams", searchParams);
      return httpResponse.error(
        HttpStatusCode.BAD_REQUEST,
        MESSAGES.INVALID_CREDENTIALS_TOKE
      );
    }

    LOG.debug(`s=confirm-email, fiding token by: code=${code}`);
    const repository = new ProfileRecoveryRepository();
    const { data, error } = await repository.findResetHashByCodeAndEmail(
      code,
      email
    );

    if (error || ObjectUtils.isNull(data) || data.length <= 0) {
      LOG.debug("error", error);
      LOG.debug("data", data);
      return httpResponse.error(
        HttpStatusCode.BAD_REQUEST,
        MESSAGES.INVALID_CREDENTIALS_TOKE
      );
    }

    const userRepository = new UserRepository();
    // Atualizar a senha do usuário e validar o email
    const updateError = await userRepository.confirmEmail(
      data[0]?.recovery_hash,
      code,
      email
    );

    console.log(updateError);
    if (updateError) {
      return httpResponse.error();
    }

    return httpResponse.accepted();
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error();
  }
}
