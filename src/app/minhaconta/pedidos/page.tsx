"use client";;
import Box from "@component/Box";
import Divider from "@component/Divider";
import Typography from "@component/Typography";
import Grid from "@component/grid/Grid";
import { useSession } from "@supabaseutils/supabase.provider";

const PedidosPage = () => {
  const { tenant } = useSession();
  return (
    <>
      <Divider mt="2rem" />
      <Grid container>
        <Grid item xs={12}>
          <Box
            borderRadius="8px"
            border="1px solid"
            borderColor="gray.500"
            p="1rem"
          >
            <Box display="flow-root">
              <Typography style={{ float: "left" }}>Cod. 98995</Typography>
              <Typography style={{ float: "right" }}>PENDENTE</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PedidosPage;
