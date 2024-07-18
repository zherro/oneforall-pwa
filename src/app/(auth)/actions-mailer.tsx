"use server";

import transporter from "@lib/nodemailer";
import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
import { IngestionDataBuilder } from "@supabaseutils/use-cases/processor/ingestion-data";
import { saveProfileRecoveryUsecase } from "@supabaseutils/use-cases/saveProfileRecovery.usecase";
import { sendEmailUseCase } from "@supabaseutils/use-cases/sendEmail.usecase";
import { generateCharacterCode, getUuid } from "@utils/code/codeUtils";
import { addCharacterAfterEach } from "@utils/helpers/String.utils";
import { LOG } from "@utils/log";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function recovery(formData: any) {
  const email = formData.get("email");

  const result = await saveProfileRecoveryUsecase(
    new IngestionDataBuilder()
      .addInput({
        email,
        recovery_code: generateCharacterCode(6),
        recovery_hash: getUuid(),
      })
      .build()
  );

  const output = result.output;

  console.log(output)

  if (output?.error) {
    LOG.debug("error", output.error);
    redirect(`/error`);
  }

  try {
    await sendEmailUseCase(
      IngestionDataBuilder.of()
        .addInput({
          email,
          subject: "Recupera Senha - BIMOAPP",
          template: "recovery",
          code: addCharacterAfterEach(output.data?.recovery_code, " "),
          recoveryLink: `${process.env.SITE_URI}/reset-password?code=${output.data?.recovery_code}&email=${email}`,
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
