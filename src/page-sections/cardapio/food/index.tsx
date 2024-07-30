"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import Grid from "@component/grid/Grid";
import useWindowSize from "@hook/useWindowSize";
import TitleCard from "@component/cards/TitleCard";
import TipCard from "@component/cards/TipCard";
import Stepper from "@component/Stepper";
import { Flex, Spacer, Stack, Switch } from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@component/buttons";
import Icon from "@component/icon/Icon";
import { Accordion, AccordionHeader } from "@component/accordion";
import { SemiSpan } from "@component/Typography";
import Divider from "@component/Divider";
import { useRouter } from "next/navigation";
import APP_ROUTES from "@routes/app.routes";
import Box from "@component/Box";
import DeliveryCatalog from "./DeliveryCatalog";
import useFetch from "@hook/useFetch";
import useNotify from "@hook/useNotify";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const initialValues = {
  name: "Nome do produto",
  session: "food",
  info: "",
  status: false,
  disponibility: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
  price: "0.00",
};

const PageCatalogFood = () => {
  // const PageCatalog: FC<Props> = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [refresh, prefetchData] = useState<any>();
  const [category, setCategories] = useState<any[]>();

  const router = useRouter();
  const notify = useNotify();
  const fetchData = useFetch();

  const width: any = useWindowSize();
  const isTablet = (width || 0) < 745;

  const successCallback = useCallback((data) => {
    setCategories(data);
  }, []);

  const errorCallback = useCallback((error) => {
    notify({
      status: "error",
      description: error.message,
    });
  }, []);

  const retrieveCatalog = useCallback(() => {
    // fetchData(
    //   "/api" + APP_ROUTES.CUSTOMER.CARDAPIO.HOME + "/food",
    //   {},
    //   successCallback,
    //   errorCallback
    // );
  }, []);

  useEffect(() => {
    retrieveCatalog();
  }, [refresh]);

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
      </Grid>
      {/* <DeliveryCatalog /> */}
      <Grid container spacing={0}>
        {category?.map((cat: any) => (
          <Grid item xs={12} key={cat.id}>
            <Accordion expanded>
              <AccordionHeader px="0px" py="6px" color="text.muted">
                <Box width="100%">
                  <Flex width="100%">
                    <SemiSpan className="cursor-pointer" mr="9px">
                      {cat.name}
                    </SemiSpan>
                    <Spacer />
                    <Switch
                      name="status"
                      size="md"
                      style={{ margin: "0 1rem" }}
                      isChecked={cat.status == StatusEntity.ACTIVE}
                      onChange={(event) => {}}
                    />
                  </Flex>
                  <Divider width="100%" mt="1.5rem" bg="gray.400" />
                </Box>
              </AccordionHeader>

              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Divider mb="1rem" />
                  <Stack direction={"row-reverse"}>
                    <Button
                      mt=""
                      bg="primary.main"
                      color="white"
                      padding="0.25rem"
                      height="1.35rem"
                      style={{
                        fontWeight: "400",
                        fontSize: "0.85rem",
                        lineHeight: "1rem",
                      }}
                      onClick={
                        () =>
                          "" /*router.push(APP_ROUTES.CUSTOMER.CARDAPIO.FOOD_ITEM + '/' + cat.id)*/
                      }
                    >
                      <Icon size="1rem" pr=".35rem">
                        plus
                      </Icon>
                      Novo produto
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Accordion>
          </Grid>
        ))}
      </Grid>

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
    </>
  );
};

const stepperList = [{ title: "Catálogo", disabled: false }];

export default PageCatalogFood;
