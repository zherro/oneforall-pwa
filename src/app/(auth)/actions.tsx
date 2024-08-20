"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@supabaseutils/utils/server";
import APP_ROUTES from "routes/app.routes";
import { LOG } from "@utils/log";
import { isAuthError } from "@supabase/supabase-js";
import { sendEmailUseCase } from "@supabaseutils/use-cases/sendEmail.usecase";
import { IngestionDataBuilder } from "@supabaseutils/use-cases/processor/ingestion-data";
import { addCharacterAfterEach } from "@utils/helpers/String.utils";
import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
import { encrypt, generateCharacterCode, getUuid } from "@utils/code/codeUtils";

export async function login(formData: any) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data1 = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error, data } = await supabase.auth.signInWithPassword(data1);

  if (error) {
    LOG.debug("Login error", error);
    if (isAuthError(error)) {
      redirect("/login?retry=true");
    } else {
      redirect("/error");
    }
  }

  await supabase.auth.updateUser({
    data: {
      tenant: {
        id: data.user.id,
        company_short_name: (data.user.email, "Meu Perfil@mail.com").split(
          "@"
        )[0],
      },
    },
  });

  LOG.debug("USER AUTH OK", data);

  revalidatePath("/", "layout");

  setTimeout(() => {}, 3000);
  redirect(APP_ROUTES.DASHBOARD.WELCOME);
}

export async function signup(formData: any) {
  const supabase = createClient();

  const data1 = {
    email: formData.get("email"),
    password: formData.get("password"),
    email_confirm: false, // Certifique-se de desativar a confirmação de email
    options: {
      data: {
        completed: false,
      },
    },
  };

  const { data, error } = await supabase.auth.signUp(data1);

  if (error && error.code == "user_already_exists") {
    LOG.debug("Signup error", error);
    redirect("/user-exists");
  } else if (error) {
    LOG.error("Signup error", error);
    redirect("/error");
  }

  const repository = new ProfileRecoveryRepository();
  const { data: data2, error: error1 } = await repository.saveAndGet({
    email: data1.email,
    recovery_code: generateCharacterCode(6),
    recovery_hash: getUuid(),
    created_at: new Date(),
  });

  if (error1) {
    LOG.debug("error", error1);
    redirect(`/error`);
  }

  try {
    const token = encrypt(
      `${data2?.recovery_code + data1.email}`,
      data2?.recovery_hash
    );

    await sendEmailUseCase(
      IngestionDataBuilder.of()
        .addInput({
          email: formData.get("email"),
          subject: "Seja Bem Vindo - BIMOAPP",
          template: "signup",
          code: addCharacterAfterEach(data2?.recovery_code, " "),
          recoveryLink: `${
            process.env.SITE_URI
          }/confirm-email?token=${token}&code=${
            data2?.recovery_code
          }&email=${formData.get("email")}`,
        })
        .build()
    );
  } catch (error) {
    console.error(error);
    redirect(`/error`);
  }

  // const signUpUser = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  //         },
  //         body: JSON.stringify(data1),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error_description || errorData.message);
  //     }

  //     const data = await response.json();
  //     console.log("User signed up:", data);
  //   } catch (error) {
  //     LOG.debug("Signup error", error);
  //     redirect("/error");
  //   }
  // };

  // await signUpUser();

  // const { error } = await supabase.auth.signUp(data);

  // if (error) {
  //   LOG.debug("Signup error", error);
  //   redirect("/error");
  // }

  // await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect(`/welcome?email=${data1.email}`);
}

export async function logout() {
  const supabase = createClient();

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
