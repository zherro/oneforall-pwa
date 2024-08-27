"use client";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import { H2, SemiSpan } from "@component/Typography";
import ProfileEditForm from "@sections/account/ProfileEditForm";

export default function CompleteYourProfilePage() {
  return (
    <>
      <Grid container splited spacing={6}>
        <Grid item xs={12}>
          <H2 mt="0.75rem" color="primary.main">
            Complete o seu cadastro!
          </H2>
          <Divider bg="gray.400" mb="0.75rem" />
          <Box mb="1rem">
            <SemiSpan fontSize="1rem">
              Informe seu nome e telefone para continuar!
            </SemiSpan>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ProfileEditForm />
        </Grid>
      </Grid>
    </>
  );
}
