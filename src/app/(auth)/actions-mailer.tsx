"use server";

import transporter from "@lib/nodemailer";
import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
import { IngestionDataBuilder } from "@supabaseutils/use-cases/processor/ingestion-data";
import { sendEmailUseCase } from "@supabaseutils/use-cases/sendEmail.usecase";
import { generateCharacterCode, getUuid } from "@utils/code/codeUtils";
import { addCharacterAfterEach } from "@utils/helpers/String.utils";
import { LOG } from "@utils/log";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function recovery(formData: any) {
  const email = formData.get("email");

  const repository = new ProfileRecoveryRepository();
  const { data, error } = await repository.save({
    email,
    recovery_code: generateCharacterCode(6),
    recovery_hash: getUuid(),
  });

  if (error) {
    LOG.debug("error", error);
    redirect(`/error`);
  }

  try {
    await sendEmailUseCase(
      IngestionDataBuilder.of()
        .addInput({
          email,
          subject: "Recupera Senha - BIMOAPP",
          template: "recovery",
          code: addCharacterAfterEach(data?.recovery_code, " "),
          recoveryLink: `${process.env.SITE_URI}/reset-password?code=${data?.recovery_code}&email=${email}`,
        })
        .build()
    );
  } catch (error) {
    console.error(error);
    redirect(`/error`);
  }

  revalidatePath("/", "layout");
  redirect(`/recovery-send?email=${email}`);
}
