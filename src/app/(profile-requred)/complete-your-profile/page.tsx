"use server";
import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import ProfileEditForm from "@sections/account/ProfileEditForm";
import { createClient } from "@supabaseutils/utils/server";
import { redirect, useRouter } from "next/navigation";

export default async function CompleteYourProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user == null || user == undefined) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id);

  return (
    <>
      <Grid container splited spacing={6}>
        <Grid item xs={12}>
          <H2 mt="0.75rem" textAlign="center">
            Complete o seu cadastro!
          </H2>
        </Grid>
        <Grid item xs={12}>
          <ProfileEditForm user={user as any} profile={data as any} />
        </Grid>
      </Grid>
    </>
  );
}
