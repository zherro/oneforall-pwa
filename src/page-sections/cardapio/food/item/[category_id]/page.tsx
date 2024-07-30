"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import useWindowSize from "@hook/useWindowSize";
import TitleCard from "@component/cards/TitleCard";
import { useParams, useRouter } from "next/navigation";
import Stepper from "@component/Stepper";
import Category from "@models/lara/categories/category.model";
import ProductModel from "@models/lara/catalog/product/product.model";
import NewProductItem from "@sections/cardapio/NewItem";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import useFetch from "@hook/useFetch";
import useNotify from "@hook/useNotify";
import CatalogSelectorBox from "@component/catalog/CatalogSelectorBox";
import { StatusEntity } from "@models/types/StatusEntity";
import { useSession } from "@supabaseutils/supabase.provider";
import { sessionTenant } from "@utils/session";
import StringUtils from "@utils/string";
import Objects from "@utils/objects";
import { Skeleton } from "@chakra-ui/react";
import Divider from "@component/Divider";

// ======================================================
type screens = "home" | "price" | "complements" | "image" | "disponibility";

interface ScreenContentProps {
  screen: screens;
  title: string;
  hat: string;
  stepperList?: any;
  selectedCategory?: { icon: string; name: string } | null;
  goBack?: Function;
}

const productTypes = (setType: Function) => {
  return [
    {
      icon: "extra/pizza",
      title: "Pizza's",
      type: "pizza",
      description:
        "Preparamos um forma especial e facil de configurar todos os sabores de pizza's.",
      onClick: () => setType({ name: "Pizza's", type: "pizza", icon: "food" }),
    },
    {
      icon: "bottle",
      title: "Bebidas",
      type: "drink",
      description:
        "Cadastre as bebidas que você fornece, seja indutrializada ou de produção própria.",
      onClick: () => setType({ name: "Bebidas", type: "drink", icon: "food" }),
    },
    {
      icon: "food",
      title: "Itens Gerais",
      type: "all",
      description:
        "Lanches, petiscos, bolos, doces e salgados. E também configure complementos.",
      onClick: () =>
        setType({ name: "Itens Gerais", type: "all", icon: "food" }),
    },
  ];
};

// ======================================================

const screenContentInitial: ScreenContentProps = {
  screen: "home",
  title: "Novo Produto",
  hat: "Siga as super dicas que reservamos pra você, e arrase nas vendas!",
  stepperList: [
    { title: "Detalhes", disabled: false, hidden: false },
    { title: "Fotos", disabled: true, hidden: true },
    { title: "Preços", disabled: true, hidden: true },
    { title: "Disponibilidade", disabled: true, hidden: true },
    { title: "Complementos", disabled: true, hidden: true },
  ],
};

const screenContentInitialUpdated = (step: number = 0): ScreenContentProps => {
  return {
    screen: "home",
    title: "Novo Produto",
    hat: "Siga as super dicas que reservamos pra você, e arrase nas vendas!",
    stepperList: [
      { title: "Detalhes", disabled: false, hidden: false },
      { title: "Fotos", disabled: !(step >= 2), hidden: false },
      { title: "Preços", disabled: !(step >= 3), hidden: false },
      { title: "Disponibilidade", disabled: !(step >= 4), hidden: false },
      { title: "Complementos", disabled: !(step >= 5), hidden: false },
    ],
  };
};

const initialState: ProductModel = {
  product_type: "",
  name: "",
  description: "",
  category_id: "",
  price: 0.0,
  status: StatusEntity.ATIVO,
  disponibility: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
  sale_delivery: true,
  sale_pickup_in_store: false,
  discount: 0.0,
  discount_percent: 0,
  has_inventory: false,
  qtd_inventory: 0,
  has_complements: false,
};

const NewProductPage = ({ productId }: { productId?: string }) => {
  const { session } = useSession();

  // routes
  const router = useRouter();
  const notify = useNotify();
  const params: any = useParams();
  const categoryId = params["category_id"];

  const fetchData = useFetch();

  if (categoryId == null) {
    router.push(APP_ROUTES.CUSTOMER.CARDAPIO.HOME);
  }

  // data
  const [category, setCategory] = useState<Category | null>(null);
  const [productType, setProductType] = useState<{
    name?: string;
    type?: string;
    icon?: string;
  }>({});
  const [productData, setProductData] = useState<ProductModel | null>({
    ...initialState,
    category_id: categoryId,
  });

  const setType = (type) => {
    setProductType(type);
    setProductData({ ...productData, product_type: type.type });
  };

  // form
  const [files, setFiles] = useState<any>();
  const [submited, setSubmited] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(
    StringUtils.isEmptyString(productId)
  );

  // API INTEGRATION
  const getCategorySuccessCallback = (data: any[]) => {
    if (data.length <= 0) {
      notify({
        status: "error",
        description: "Não encontrei a categoria do produto!",
      });
    } else {
      setCategory(data[0]);
      setSubmited(false);
    }
  };

  const getProductSuccessCallback = (data: any[]) => {
    if (data.length <= 0) {
      notify({
        status: "error",
        description: "Não consegui localizar o produto informado!",
      });
    } else {
      productTypes(setProductType)
        .filter((pt) => (pt.type = data[0]?.product_type))[0]
        ?.onClick();
      setProductData(data[0]);
      setSubmited(false);
    }
  };

  const saveProductSuccessCallback = (data: any[]) => {
    if (data?.length > 0) {
      notify({
        status: "success",
        description: "Produto criado com sucesso!",
      });

      setProductData(data[0]);
      router.replace(
        `/customer/cardapio/food/item/${categoryId}/${data[0].id}`
      );
    }
    setSubmited(false);
  };

  const errorCallback = (error) => {
    notify({
      status: "error",
      description: error.message,
    });
    setSubmited(false);
  };

  useEffect(() => {
    setSubmited(true);
    fetchData(
      API_ROUTES.CUSTOMER.CATEGORY + `/${categoryId}`,
      {},
      getCategorySuccessCallback,
      errorCallback
    );

    if (StringUtils.notBlankString(productId)) {
      fetchData(
        API_ROUTES.CUSTOMER.PRODUCT + `/${productId}`,
        {},
        getProductSuccessCallback,
        errorCallback
      );
    }
  }, [categoryId, categoryId]);

  // if (formData?.files?.length > 0) {
  //   for (let i = 0; i < formData?.files?.length; i++) {
  //     const file = formData?.files[i];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       files.push({
  //         extension: file.fileExtension,
  //         type: file.fileType,
  //         name: file.filename,
  //         simpleName: file.filenameWithoutExtension,
  //         size: file.fileSize,
  //         base64: reader.result,
  //       });
  //     };
  //     reader.readAsDataURL(file.file);
  //   }
  // }

  const saveProduct = useCallback(
    async (product: ProductModel) => {
      if (!Objects.compare(product, productData)) {
        console.log("eeeeeeeeeeeeeeeeeeepa");
        setSubmited(true);
        const tenant_id = sessionTenant(await session)?.id;
        fetchData(
          API_ROUTES.CUSTOMER.PRODUCT,
          {
            method: "POST",
            body: JSON.stringify({ ...product, tenant_id: tenant_id }),
          },
          saveProductSuccessCallback,
          errorCallback
        );
      } else {
        setSubmited(false);
      }
    },
    [session, productData, setSubmited]
  );

  //  API INTEGRATION - END

  // const PageCatalog: FC<Props> = ({ children }) => {
  const [screen, setScreen] = useState<screens>("home");
  const [screenContent, setScreenContent] = useState<ScreenContentProps>(
    StringUtils.isEmptyString(productId)
      ? screenContentInitial
      : screenContentInitialUpdated(1)
  );

  const [selectedStep, setSelectedStep] = useState(1);

  const width: any = useWindowSize();
  const isTablet = width < 745;

  const actionStep = useCallback(
    (ind: number) => {
      if (ind > selectedStep) {
        setScreenContent(screenContentInitialUpdated(ind));
      }

      if (selectedStep != ind) {
        setSelectedStep(ind);
      }

      switch (ind) {
        case 1:
          setScreen("home");
          break;
        case 2:
          setScreen("image");
          break;
        case 3:
          setScreen("price");
          break;
        case 4:
          setScreen("disponibility");
          break;
        case 5:
          setScreen("complements");
          break;
        default:
          break;
      }
    },
    [selectedStep]
  );

  const handleStepChange = (_step: any, ind: number) => {
    actionStep(ind);
  };

  return (
    <Fragment>
      {productId == undefined && (productType?.type || "").length <= 0 && (
        <>
          <Grid container splited spacing={8}>
            <Grid item xs={12}>
              <TitleCard
                goBack={APP_ROUTES.CUSTOMER.CARDAPIO.HOME}
                title="Qual o tipo do produto?"
                text="Para cada tipo de produto, preparamos um modo especial de facilitar as coisas pra você!"
              />
            </Grid>
          </Grid>
          <CatalogSelectorBox options={productTypes(setType)} />
        </>
      )}

      {(productId != undefined || (productType?.type || "").length > 0) && (
        <Grid container splited vertical_spacing={8}>
          <Grid item xs={12}>
            <Divider mt="1rem" />
            <TitleCard
              goBack={APP_ROUTES.CUSTOMER.CARDAPIO.HOME}
              title={screenContent?.title}
              text={screenContent?.hat}
            />
          </Grid>
        </Grid>
      )}

      <Skeleton height="50px" isLoaded={isLoaded}>
        {((productType?.type || "").length > 0 ||
          StringUtils.notBlankString(productData?.product_type)) &&
          screenContent?.stepperList && (
            <Grid container splited spacing={8}>
              <Grid item xs={12}>
                <Stepper
                  select={selectedStep}
                  square
                  aligin="start"
                  stepperList={screenContent.stepperList}
                  selectedStep={selectedStep}
                  onChange={handleStepChange}
                />
              </Grid>
            </Grid>
          )}
      </Skeleton>

      <Skeleton height="50px" mt="2rem" isLoaded={isLoaded} />
      <Skeleton height="60px" width="50%" mt="2rem" isLoaded={isLoaded} />
      <Skeleton height="60px" width="60%" mt="2rem" isLoaded={isLoaded} />
      <Skeleton height="120px"  mt="2rem" isLoaded={isLoaded} />

      {isLoaded && ((productType?.type || "").length > 0 ||
        StringUtils.notBlankString(productData?.product_type)) &&
        productData != null && (
          <NewProductItem
            category={category}
            productType={productType}
            initialValues={productData}
            files={files}
            setFiles={setFiles}
            submited={submited}
            setSubmited={setSubmited}
            page={screen}
            selectedStep={selectedStep}
            setScreenContent={(e: any) => {
              e.preventDefault();
              if (
                selectedStep < 5 &&
                productData?.id != null &&
                productData?.id != undefined
              ) {
                setSelectedStep(1 + selectedStep);
              }
            }}
            backScreenContent={(e: any) => {
              e.preventDefault();
              if (selectedStep > 0) {
                setSelectedStep(selectedStep - 1);
              }
            }}
            cancelAction={() => router.push(APP_ROUTES.CUSTOMER.CARDAPIO.HOME)}
            saveCallback={(product: any, f?: any) => {
              saveProduct(product);
            }}
          />
        )}
    </Fragment>
  );
};

const stepperList = [{ title: "Catálogo", disabled: false }];

export default NewProductPage;
