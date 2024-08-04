"use client";
import { Stack } from "@chakra-ui/react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Image from "@component/Image";
import { SearchInput } from "@component/search-box";
import Typography from "@component/Typography";

const SalesNewPage = () => {
  const ShortCutLabel = ({ children }) => {
    return <span style={{ fontWeight: "300" }}></span>;
  };

  return (
    <>
      <Grid container >
        <Grid item xs={12} md={6}>
          <Stack direction="row" width="100%" mt="1rem">
            <Box
              textAlign="center"
              p="0.5rem"
              color="primary.text"
              fontWeight="600"
              bg="primary.main"
              width="33.333333%"
            >
              Produtos
            </Box>
            <Box
              textAlign="center"
              p="0.5rem"
              color="primary.text"
              fontWeight="600"
              bg="primary.main"
              width="33.333333%"
            >
              Cliente
            </Box>
            <Box
              textAlign="center"
              p="0.5rem"
              color="primary.text"
              fontWeight="600"
              bg="primary.main"
              width="33.333333%"
            >
              Produtos
            </Box>
          </Stack>
          <Box pt="1rem">
            <Typography mb="0.25rem" fontWeight="600">
              Pesquisa de produtos:
            </Typography>
            <SearchInput iconbtn={true} />
          </Box>
          <Stack direction="row" mt="1rem">
            <Box width="50%">
              <Image
                border="1px solid"
                borderColor="gray.500"
                borderRadius="8px"
                width="100%"
                src="/assets/images/no-image-opmized.png"
              />
            </Box>
            <FlexBox width="50%" justifyContent="end" flexDirection="column">
              <Typography fontSize="1.75rem" fontWeight="600" textAlign="end">
                9.99
              </Typography>
            </FlexBox>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SalesNewPage;
