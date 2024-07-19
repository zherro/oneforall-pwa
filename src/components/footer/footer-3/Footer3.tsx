import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Typography from "@component/Typography";

export default function Footer3() {
  return (
    <>
      <footer>
        <Box backgroundColor="#093D65">
          <Container p="1rem" color="white">
            <Box pt="2rem" overflow="hidden">
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Typography textAlign="center" pb="2rem" fontSize="1.25rem">
                    Bora Cuiabá © {new Date().getFullYear()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </footer>
    </>
  );
}
