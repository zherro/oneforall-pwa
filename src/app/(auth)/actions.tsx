"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@supabaseutils/utils/server";
import APP_ROUTES from "routes/app.routes";
import { LOG } from "@utils/log";
import { isAuthError } from "@supabase/supabase-js";

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
  redirect(APP_ROUTES.DASHBOARD.HOME);
}

export async function signup(formData: any) {
  const supabase = createClient();

  const data1 = {
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        completed: false,
      },
    },
  };

  const { data, error } = await supabase.auth.signUp(data1);

  if (error) {
    LOG.debug("Signup error", error);
    redirect("/error");
  } else if (data.user?.identities?.length === 0) {
    
  }

  console.log(error)

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

  revalidatePath("/", "layout");
  redirect(APP_ROUTES.AUTH.LOGIN);
}
