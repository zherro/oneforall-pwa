"use client";
import Box from "@component/Box";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Typography, { SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import { useSession } from "@supabaseutils/supabase.provider";
import CodeUtils from "@utils/code/codeUtils";
import Image from "next/image";

const PedidosPage = () => {
  const { tenant } = useSession();
  return (
    <>
      <Divider mt="2rem" />
      <Grid container>
        <Grid item xs={12}>
          <Box borderRadius="8px" border="1px solid" borderColor="gray.500">
            <Box
              p="0.5rem"
              display="flow-root"
              backgroundColor="secondary.main"
              color="primary.text"
              fontWeight="600"
              borderTopLeftRadius="8px"
              borderTopRightRadius="8px"
            >
              <Typography mr="0.25rem" style={{ float: "left" }}>
                # 13
              </Typography>
              <Typography
                mx="0.25rem"
                fontSize="1.5rem"
                lineHeight="1.05rem"
                style={{ float: "left" }}
              >
                {"  -  "}
              </Typography>
              <Typography ml="0.25rem" style={{ float: "left" }}>
                Cod. {CodeUtils.generateCharacterCode(6)}
              </Typography>
              <Typography style={{ float: "right" }}>10 minutos</Typography>
            </Box>
            <Box p="0.75rem">
              <Box>
                <Typography fontWeight="600">Nome do cliente</Typography>
                <SemiSpan>Endereço da entrega </SemiSpan>
              </Box>
              <Box pt="0.5rem">
                <Typography fontWeight="600">R$ 38,79</Typography>
                <SemiSpan>Forma de pagamento</SemiSpan>
              </Box>
              <Box>
                <Typography>Ver detalhes</Typography>
                <SemiSpan>Tipo da Entrega</SemiSpan>
              </Box>
              <FlexBox justifyContent="end">
                <Button
                  style={{
                    position: "relative",
                  }}
                  mr="1rem"
                  mt="0.25rem"
                >
                  <div
                    style={{
                      backgroundColor: "red",
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                      borderRadius: "50%",
                      top: 0,
                      right: 15,
                      padding: "0.25rem",
                      color: "white",
                    }}
                  >
                    2
                  </div>
                  <Icon>mail</Icon>
                </Button>
                <Button
                  px="1rem"
                  height="38px"
                  borderRadius="16px"
                  color="primary"
                  variant="contained"
                >
                  Aceitar{" "}
                  <Icon ml="0.5rem" size="16px">
                    check
                  </Icon>
                </Button>
              </FlexBox>
            </Box>
          </Box>
          {/* <Box>
            <img
              width="100%"
              src="https://lp.querodelivery.com/wp-content/webp-express/webp-images/uploads/2023/06/tela-parceiro-querodelivery-2.jpg.webp"
            />
          </Box> */}
        </Grid>
      </Grid>
    </>
  );
};

export default PedidosPage;
