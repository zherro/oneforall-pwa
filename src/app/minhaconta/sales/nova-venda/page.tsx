"use client";
import { Stack } from "@chakra-ui/react";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Image from "@component/Image";
import { SearchInput } from "@component/search-box";
import Typography, { H3 } from "@component/Typography";
import { fetchGet } from "@hook/useFetch2";
import useHandleError from "@hook/useHandleError";
import useNotify from "@hook/useNotify";
import { maskMoney } from "@lib/mask/lib/mask";
import { API_ROUTES } from "@routes/app.routes";
import { ProductDTO } from "@supabaseutils/model/dto/Cardapio.dto";
import { useState } from "react";

interface OrderItemDTO extends ProductDTO {
  qtd: number;
}

interface OrderDTO {
  id: string;
  uid: number;
  total: number;
  itens: OrderItemDTO[];
}

function calculateTotal(products: OrderItemDTO[]): number {
  return products.reduce((total, product) => {
    // Multiplica o price pela qtd e acumula no total
    return total + product.price * product.qtd;
  }, 0); // O valor inicial do total é 0
}

const SalesNewPage = () => {
  const notify = useNotify();

  const URI = API_ROUTES.CATALOG.PRODUCT_SEARCH;
  const [loading, onLoading] = useState<boolean>(false);

  const [showProductList, setShowProductList] = useState<boolean>(false);
  const [searchedProducts, setSearchProductResult] = useState<any[]>([]);

  const [editItem, setEditItem] = useState<OrderItemDTO | any>({});

  const [order, setorder] = useState<OrderDTO | any>({ itens: [] });

  const addItem = (product: OrderItemDTO) => {
    const newItens = [...(order.itens || []), product];
    setorder((o) => ({
      ...o,
      itens: newItens,
      total: calculateTotal(newItens),
    }));
    setEditItem({});
  };

  const searchProducts = (query: string) => {
    fetchGet(URI + `?query=${query}`, {
      handleData: (data) => {
        setSearchProductResult(data);
        setShowProductList(true);
      },
      handleError: useHandleError(notify),
      onLoading,
    });
  };

  return (
    <>
      <Grid container>
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
            <SearchInput
              iconbtn={true}
              onSearch={(text) => {
                searchProducts(text);
              }}
            />
          </Box>
          {showProductList && (
            <Box
              pt="0.5rem"
              px="0.5rem"
              mt="1rem"
              border="1px solid"
              borderColor="gray.400"
              borderRadius="8px"
            >
              <Stack direction="column">
                {searchedProducts.map((product) => (
                  <FlexBox
                    borderBottom="1px solid"
                    borderColor="gray.400"
                    py="0.5rem"
                    onClick={() => {
                      setEditItem({ ...product, qtd: 1 });
                      setShowProductList(false);
                    }}
                  >
                    <Box flexGrow={1}>{product.product}</Box>
                    <Box
                      color="error.main"
                      textAlign="right"
                      fontSize="0.85rem"
                      width="5rem"
                    >
                      -{maskMoney(product.discount)}
                    </Box>
                    <Box
                      fontWeight="600"
                      textAlign="right"
                      fontSize="0.85rem"
                      width="6rem"
                      px="0.5rem"
                    >
                      R$ {maskMoney(product.price)}
                    </Box>
                  </FlexBox>
                ))}
              </Stack>
            </Box>
          )}
          {!showProductList && (
            <>
              <Stack direction="row" mt="1rem">
                <Box width="50%">
                  <Image
                    border="1px solid"
                    borderColor="gray.500"
                    borderRadius="8px"
                    width="150px"
                    src="/assets/images/no-image-opmized.png"
                  />
                </Box>
                <FlexBox
                  width="50%"
                  justifyContent="end"
                  flexDirection="column"
                >
                  <Typography
                    fontSize="1.75rem"
                    fontWeight="600"
                    textAlign="end"
                    color="gray.600"
                  >
                    R$ {maskMoney(editItem.price)}
                  </Typography>
                </FlexBox>
              </Stack>
              <Box py="1rem" fontWeight="500">
                {editItem.product}
              </Box>
              <Divider bg="gray.400" />
              <Box mt="1rem" display="flow-root">
                <Button
                  mt="0.25rem"
                  variant="outlined"
                  color="primary"
                  padding="0.75rem"
                  style={{ fontSize: "1.5rem", float: "right" }}
                  onClick={() => {
                    setEditItem((ei) => ({ ...ei, qtd: ei.qtd + 1 }));
                  }}
                >
                  +
                </Button>
                <Box
                  width="8rem"
                  pt="0.30rem"
                  px="0.75rem"
                  style={{ fontSize: "1.15rem", float: "right" }}
                >
                  <input
                    value={editItem.qtd || 0}
                    onChange={(e) => {
                      setEditItem((ei) => ({
                        ...ei,
                        qtd: +(e.target.value || 0),
                      }));
                    }}
                    type="number"
                    style={{
                      textAlign: "center",
                      border: "1px solid #cdcdcd",
                      borderRadius: "6px",
                      padding: "0.25rem",
                      width: "6.5rem",
                    }}
                  />
                </Box>
                <Button
                  mt="0.25rem"
                  variant="outlined"
                  color="primary"
                  padding="0.95rem"
                  style={{ fontSize: "1.5rem", float: "right" }}
                  onClick={() => {
                    setEditItem((ei) => ({
                      ...ei,
                      qtd: ei.qtd > 0 ? ei.qtd - 1 : ei.qtd,
                    }));
                  }}
                >
                  -
                </Button>
              </Box>

              <Divider bg="gray.400" my="1rem" />

              <FlexBox justifyContent="end">
                {editItem.qtd > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      addItem(editItem);
                    }}
                  >
                    Adicionar ao Pedido
                  </Button>
                )}
              </FlexBox>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p="1rem">
            <H3 textAlign="right" color="secondary.main" fontWeight="600">
              Pedido/Venda
            </H3>
            <Divider bg="gray.400" />
          </Box>

          <Box
            pt="1rem"
            px="1rem"
            m="0.5rem"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="8px"
            minHeight="445px"
          >
            <Stack direction="column">
              {order?.itens?.map((product) => (
                <FlexBox
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  py="0.5rem"
                  onClick={() => {
                    setEditItem({ ...product, qtd: 1 });
                    setShowProductList(false);
                  }}
                >
                  <Box flexGrow={1}>{product.product}</Box>
                  <Box textAlign="right" fontSize="0.85rem" width="5rem">
                    {product.qtd}x
                  </Box>
                  <Box
                    color="error.main"
                    textAlign="right"
                    fontSize="0.85rem"
                    width="5rem"
                  >
                    -{maskMoney(product.discount)}
                  </Box>
                  <Box
                    fontWeight="600"
                    textAlign="right"
                    fontSize="0.85rem"
                    width="6rem"
                    px="0.5rem"
                  >
                    R$ {maskMoney(product.price)}
                  </Box>
                </FlexBox>
              ))}
            </Stack>
          </Box>
          <Divider bg="gray.400" />
          <FlexBox>
            <Typography
              width="50%"
              padding="1rem"
              fontWeight="600"
              fontSize="1.5rem"
              mt="0.5rem"
            >
              TOTAL
            </Typography>
            <Typography
              width="50%"
              padding="1rem"
              textAlign="right"
              fontWeight="600"
              fontSize="2rem"
            >
              R$ {maskMoney(order.total)}
            </Typography>
          </FlexBox>
        </Grid>
      </Grid>
    </>
  );
};

export default SalesNewPage;
