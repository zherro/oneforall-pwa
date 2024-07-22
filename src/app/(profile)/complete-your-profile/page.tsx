import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import ProfileEditForm from "@sections/account/ProfileEditForm";
import { createClient } from "@supabaseutils/utils/server";

export default async function CompleteYourProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id);

  return (
    <>
      <Grid container splited spacing={12}>
        <Grid item xs={12}>
          <H2 mt="2rem" textAlign="center">
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
