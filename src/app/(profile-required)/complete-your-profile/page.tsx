"use client";;
import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import ProfileEditForm from "@sections/account/ProfileEditForm";

export default function CompleteYourProfilePage() {


  return (
    <>
      <Grid container splited spacing={6}>
        <Grid item xs={12}>
          <H2 mt="0.75rem" textAlign="center">
            Complete o seu cadastro!
          </H2>
        </Grid>
        <Grid item xs={12}>
          <ProfileEditForm />
        </Grid>
      </Grid>
    </>
  );
}
