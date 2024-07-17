"use server";

import transporter from "@lib/nodemailer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function recovery(formData: any) {
  const email = formData.get("email");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recupera Senha - BIMOAPP",
    template: "recovery",
    // context: {
    //   name: name,
    // },
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    redirect(`/error`);
  }

  revalidatePath("/", "layout");
  redirect(`/recovery-send?email=${email}`);
}
