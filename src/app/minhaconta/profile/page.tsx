import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import HeaderPageDashBoard from "@component/header/HeaderPageDashBoard";
import { SemiSpan } from "@component/Typography";
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
          <Box mt="1rem">
            <SemiSpan fontSize="0.95rem">
              Aqui você pode gerenciar as informações da sua conta.
            </SemiSpan>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ProfileEditForm user={user as any} profile={data as any} />
        </Grid>
      </Grid>
    </>
  );
}
