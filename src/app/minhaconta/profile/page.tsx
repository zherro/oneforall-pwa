import Grid from "@component/grid/Grid";
import HeaderPageDashBoard from "@component/header/HeaderPageDashBoard";
import ProfileEditForm from "@sections/account/ProfileEditForm";
import { createClient } from "@supabaseutils/utils/server";

export default async function EditYourProfilePage() {
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
      <Grid container splited spacing={6}>
        <Grid item xs={12}>
          <HeaderPageDashBoard icon="user" title="Meu Perfil" />
        </Grid>
        <Grid item xs={12}>
          <ProfileEditForm user={user as any} profile={data as any} />
        </Grid>
      </Grid>
    </>
  );
}
