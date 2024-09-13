"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import Grid from "@component/grid/Grid";
import useWindowSize from "@hook/useWindowSize";
import TitleCard from "@component/cards/TitleCard";
import TipCard from "@component/cards/TipCard";
import Stepper from "@component/Stepper";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@component/buttons";
import Icon from "@component/icon/Icon";
import { SemiSpan } from "@component/Typography";
import Divider from "@component/Divider";
import { useRouter, useSearchParams } from "next/navigation";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import Box from "@component/Box";
import DeliveryCatalog from "./DeliveryCatalog";
import useFetch from "@hook/useFetch";
import useNotify from "@hook/useNotify";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import { fetchGet, fetchPost } from "@hook/useFetch2";
import TipBox from "@component/tips/TipBox";
import CardapioWelcome from "../CardapioWelcome";
import { maskMoney } from "@lib/mask/lib/mask";
import useHandleError from "@hook/useHandleError";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const PageCatalogFood = ({ start = false }) => {
  const query = useSearchParams();
  const API_URI_CARDAPIO = API_ROUTES.CUSTOMER.CATALOG.MY_CARDAPIO;
  const API_URI_CARDAPIO_UPDATE_STATUS_CATEGORY =
    API_ROUTES.CUSTOMER.CATALOG.CATEGORY_CHANGE_STATUS;

  const [category, handleDataCategory] = useState<any>();
  const [errorCategory, handleErrorCategory] = useState<any>();
  const [loadingCategory, onLoadingCategory] = useState<boolean>(false);

  // const PageCatalog: FC<Props> = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [refresh, prefetchData] = useState<any>();

  const router = useRouter();
  const notify = useNotify();
  const fetchData = useFetch();

  const width: any = useWindowSize();
  const isTablet = (width || 0) < 745;

  const retrieveCatalog = useCallback(() => {
    // fetchData(
    //   "/api" + APP_ROUTES.CUSTOMER.CARDAPIO.HOME + "/food",
    //   {},
    //   successCallback,
    //   errorCallback
    // );
  }, []);

  useEffect(() => {
    fetchGet(API_URI_CARDAPIO, {
      notify: true,
      headers: {},
      handleData: handleDataCategory,
      handleError: useHandleError(notify),
      onLoading: onLoadingCategory,
    });
  }, [refresh]);

  const updateStatusCategory = (checked: boolean, categoryId: string) => {
    const status = checked ? StatusEntity.ACTIVE : StatusEntity.SUSPENSE;

    const handleSuccessStatusCategory = (data) =>
      handleDataCategory((all) =>
        all.map((c) => {
          if (c.category_id == categoryId) c.category_status = status;
          return c;
        })
      );

    fetchPost(
      API_URI_CARDAPIO_UPDATE_STATUS_CATEGORY,
      {
        categoryId,
        status,
      },
      {
        notify: true,
        headers: {},
        handleData: handleSuccessStatusCategory,
        handleError: useHandleError(notify),
      }
    );
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Informe o nome da categoria"),
    session: yup.string().required("Selecione a sessão da categoria"),
  });

  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };

  const handleStepChange = (_step: any, ind: number) => {
    switch (ind) {
      case 0:
        // router.push("/cart");
        break;
      case 1:
        // router.push("/checkout");
        break;
      case 2:
        // router.push("/payment");
        break;
      case 3:
        // router.push("/orders");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!start && !loadingCategory && category?.data?.length <= 0 && (
        <CardapioWelcome />
      )}
      {!loadingCategory && (category?.length > 0 || start) && (
        <>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TitleCard
                mt="2rem"
                title="Cardápio"
                text="Aqui você gerencia seu cardápio. Controla a disponibilidade dos seus itens e como eles serão apresentados para seus clientes."
              />
            </Grid>
          </Grid>

          <TipCard
            tips={[
              {
                title: "Lojas no seu ramo têm ao menos 10 itens no cardápio",
                text: "Turbine seu cardápio com entradas, petiscos, porções, bebidas, sobremesas, para atrair ainda mais clientes!",
              },
              {
                title: "Tenha foto em ao menos 5 itens do seu cardápio",
                text: "Itens com foto atraem maior atenção e podem resutar em mais pedidos.",
              },
            ]}
          />

          <Stack direction={"row-reverse"} alignItems={"end"}>
            <Button
              mt="2rem"
              color="primary"
              style={{ fontWeight: "400" }}
              onClick={() => prefetchData(new Date())}
            >
              <Icon size="1.25rem" pr=".35rem">
                fa/solid/arrows-rotate
              </Icon>
            </Button>
            <Link href={APP_ROUTES.DASHBOARD.CATEGORY_NEW}>
              <Button
                mt="1.5rem"
                variant="outlined"
                color="primary"
                style={{ fontWeight: "400" }}
              >
                <Icon size="1.25rem" pr=".35rem">
                  plus
                </Icon>
                Adicionar nova categoria
              </Button>
            </Link>
          </Stack>

          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Stepper
                square
                aligin="start"
                stepperList={stepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
            {(errorCategory && (
              <Grid item xs={12}>
                <TipBox
                  type="error"
                  text="Oh não! Ocorreu um erro inesperado ao tentar encontrar as categorias."
                />
              </Grid>
            )) || <></>}
          </Grid>
          {/* <DeliveryCatalog /> */}

          {(category?.length > 0 &&
            category?.map((cat: any) => (
              <Box
                key={cat.category_id}
                mt="1.5rem"
                width="100%"
                border="1px solid"
                borderColor="gray.500"
                borderRadius="8px"
                p="0.75rem"
              >
                <Grid container key={cat.id}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb="1rem">
                      <SemiSpan
                        className="cursor-pointer"
                        mr="9px"
                        color="gray.900"
                        fontSize="1.15rem"
                        fontWeight="600"
                      >
                        {cat.category}
                        {cat.category_id}
                      </SemiSpan>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mb="1rem" pl="2rem" style={{ float: "right" }}>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={
                            <Icon color="secondary">
                              fa/solid/ellipsis-vertical
                            </Icon>
                          }
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              router.push(
                                APP_ROUTES.DASHBOARD.CATEGORY_NEW +
                                  `/${cat.category_id}`
                              );
                            }}
                          >
                            Editar
                          </MenuItem>
                          <MenuItem>Excluir</MenuItem>
                          {/*  TODO - opcao duplicar */}
                        </MenuList>
                      </Menu>
                    </Box>

                    <Box pl="1.5rem" style={{ float: "right" }}>
                      <Switch
                        name="status"
                        size="md"
                        isChecked={cat.category_status == StatusEntity.ACTIVE}
                        onChange={(event) => {
                          updateStatusCategory(
                            event.target.checked,
                            cat.category_id
                          );
                        }}
                      />
                      {cat.category_status == StatusEntity.ACTIVE && (
                        <Text color="teal" fontWeight="bold">
                          ATIVO
                        </Text>
                      )}
                      {cat.category_status !== StatusEntity.ACTIVE && (
                        <Text color="tomato" fontWeight="bold">
                          PAUSADO
                        </Text>
                      )}
                    </Box>
                    <Box pr="1.5rem" style={{ float: "right" }}>
                      <Link
                        href={`${APP_ROUTES.DASHBOARD.PRODUCT_NEW}/${cat.category_id}`}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          style={{
                            fontWeight: "400",
                            fontSize: "0.85rem",
                            lineHeight: "1rem",
                          }}
                        >
                          <Icon size="1rem" pr=".35rem">
                            plus
                          </Icon>
                          Adicionar Item
                        </Button>
                      </Link>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box backgroundColor="gray.200" width="100%">
                      {cat.products?.map((product) => (
                        <Box key={product.product_id}>
                          <Divider
                            width="100%"
                            bg="gray.500"
                            height="1px"
                            mb="1rem"
                          />
                          <Grid container>
                            <Grid item xs={12} sm={12} md={6}>
                              <Box mb="1rem" px="0.5rem">
                                <SemiSpan
                                  className="cursor-pointer"
                                  mr="9px"
                                  color="gray.900"
                                  fontSize="1rem"
                                >
                                  {product.product}
                                </SemiSpan>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <Box
                                mb="1rem"
                                pl="2rem"
                                style={{ float: "right" }}
                              >
                                <Menu>
                                  <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={
                                      <Icon color="secondary">
                                        fa/solid/ellipsis-vertical
                                      </Icon>
                                    }
                                    variant="outline"
                                  />
                                  <MenuList>
                                    <MenuItem
                                      onClick={() => {
                                        router.push(
                                          APP_ROUTES.DASHBOARD.PRODUCT_NEW +
                                            `/${cat.category_id}/${product.product_id}`
                                        );
                                      }}
                                    >
                                      Editar
                                    </MenuItem>
                                    <MenuItem>Excluir</MenuItem>
                                    {/*  TODO - opcao duplicar */}
                                  </MenuList>
                                </Menu>
                              </Box>

                              <Box pl="1.5rem" style={{ float: "right" }}>
                                <Switch
                                  name="status"
                                  size="md"
                                  isChecked={
                                    product.product_status ==
                                    StatusEntity.ACTIVE
                                  }
                                  onChange={(event) => {
                                    product.status = StatusEntity.ACTIVE;
                                  }}
                                />
                                {product.product_status ==
                                  StatusEntity.ACTIVE && (
                                  <Text color="teal" fontWeight="bold">
                                    ATIVO
                                  </Text>
                                )}
                                {product.product_status !==
                                  StatusEntity.ACTIVE && (
                                  <Text color="tomato" fontWeight="bold">
                                    PAUSADO
                                  </Text>
                                )}
                              </Box>
                              <Box
                                pr="1.5rem"
                                style={{ float: "right" }}
                                pt="0.5rem"
                              >
                                <SemiSpan
                                  fontSize="1rem"
                                  border="1px solid"
                                  p="0.5rem"
                                  borderRadius="5px"
                                >
                                  R$ {maskMoney(product.price / 100)}
                                </SemiSpan>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))) || <></>}

          {(category || [])?.length <= 0 && <DeliveryCatalog />}
          {/* !catalog?.category && (
        <Grid container xs={12}>
          <Grid item xs={12}>
            <H1 mt="8rem" textAlign="center">
              Que tal criar a primeira categoria?
            </H1>
            <Typography textAlign="center">
              Crie uma nova categoria, e comece a cadastrar seus produtos.
            </Typography>

            <FlexBox justifyContent="center" fontSize="2rem" mb="8rem">
              <Link href={APP_ROUTES.CUSTOMER.CATALOG.ADD_CATEGORY}>
                <Button
                  mt="1.5rem"
                  bg="primary.main"
                  color="white"
                  style={{ fontWeight: "400" }}
                >
                  <Icon size="1.25rem" pr=".35rem">
                    plus
                  </Icon>
                  Adicionar nova categoria
                </Button>
              </Link>
            </FlexBox>
          </Grid>
        </Grid>
      )*/}

          <Divider width="100%" mt="5rem" />
        </>
      )}
    </>
  );
};

const stepperList = [{ title: "Catálogo", disabled: false }];

export default PageCatalogFood;
