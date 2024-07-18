"use server";
import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
import { decrypt, encrypt } from "@utils/code/codeUtils";
import { isEmpty } from "@utils/helpers/String.utils";
import { LOG } from "@utils/log";
import { redirect } from "next/navigation";

export async function validateResetCredentials(formData: any) {
  const email = formData.get("email");
  const code = formData.get("code");
  const token_param = formData.get("token");
  const password = formData.get("password");

  const repository = new ProfileRecoveryRepository();
  const { data, error } = await repository.findResetHashByCodeAndEmail(
    code,
    email
  );

  if (error) {
    LOG.debug("error", error);
    redirect(`/error`);
  }

  if (!isEmpty(token_param)) {
    if (decrypt(token_param, data.recovery_hash) === `${code + email}`) {
      password
    } else {
      redirect(`/error`);
    }
  } else {
    const token = isEmpty(token_param)
      ? encrypt(`${code + email}`, data.recovery_hash)
      : token_param;
    redirect(`/reset-password?toke=${token}&code=${data?.code}&email=${email}`);
  }
}
