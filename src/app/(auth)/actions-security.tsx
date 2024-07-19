"use server";
import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
import UserRepository from "@supabaseutils/repositories/user.repository";
import { createClient } from "@supabaseutils/utils/server";
import { decrypt, encrypt } from "@utils/code/codeUtils";
import DateUtils from "@utils/helpers/Date.utils";
import { isEmpty } from "@utils/helpers/String.utils";
import { LOG } from "@utils/log";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function validateResetCredentials(formData: any) {
  const email = formData.get("email");
  const code = formData.get("code");

  const repository = new ProfileRecoveryRepository();
  const { data, error } = await repository.findResetHashByCodeAndEmail(
    code,
    email
  );

  if (error) {
    LOG.debug("error", error);
    redirect(`/error`);
  }

  // Calcula a data e hora que representa 6 horas atrás
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

  if (
    !data ||
    data.lenght <= 0 ||
    DateUtils.isBefore(
      DateUtils.timestampToDate(data[0]?.created_at),
      sixHoursAgo
    )
  ) {
    redirect(`/expired-token`);
  }

  const token = encrypt(`${code + email}`, data[0]?.recovery_hash);
  redirect(`/reset-password?token=${token}&code=${code}&email=${email}`);
}

export async function updatePassword(formData: any) {
  const email = formData.get("email");
  const code = formData.get("code");
  const token_param = formData.get("token");
  const password = formData.get("password");

  const repository = new ProfileRecoveryRepository();
  const { data, error } = await repository.findResetHashByCodeAndEmail(
    code,
    email
  );

  // Calcula a data e hora que representa 6 horas atrás
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

  if (
    error ||
    !data ||
    data.lenght <= 0 ||
    DateUtils.isBefore(
      DateUtils.timestampToDate(data[0]?.created_at),
      sixHoursAgo
    ) ||
    (!isEmpty(token_param) &&
      decrypt(token_param, data[0]?.recovery_hash) === `${code + email}`)
  ) {
    redirect(`/expired-token`);
  }

  const userRepository = new UserRepository();
  // Atualizar a senha do usuário e validar o email
  const updateError = await userRepository.updatePassword(
    data[0]?.recovery_hash,
    code,
    password,
    data[0]?.id
  );

  if (updateError) {
    console.error("Error updating password and validating email:", updateError);
    return { error: updateError };
  }

  revalidatePath("/", "layout");
  redirect(`/login`);
}
