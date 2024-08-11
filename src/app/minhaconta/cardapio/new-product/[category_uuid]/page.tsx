"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import TitleCard from "@component/cards/TitleCard";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Stepper from "@component/Stepper";
import NewProductItem from "@sections/cardapio/NewItem";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import useNotify from "@hook/useNotify";
import { useSession } from "@supabaseutils/supabase.provider";
import Divider from "@component/Divider";
import ProductModel from "@supabaseutils/model/catalog/Product.model";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import CategoryModel from "@supabaseutils/model/catalog/Category.model";
import StringUtils from "@utils/helpers/String.utils";
import ObjectUtils from "@utils/helpers/Object.utils";
import ChoseProductTypePage from "@sections/cardapio/product/ChoseProductType";
import { fetchGet, fetchPost } from "@hook/useFetch2";
import { productType } from "@data/productTypes";
import FormToolbox from "@sections/forms/FormToolbox";

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

// ======================================================
interface FormConfig {
  type?: string;
  typeData?: any;
  showForm?: boolean;
  productData?: ProductModel | any;
  category: CategoryModel | null;
}

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

const screenContentInitialUpdated = (started: boolean): ScreenContentProps => {
  return {
    screen: "home",
    title: "Novo Produto",
    hat: "Siga as super dicas que reservamos pra você, e arrase nas vendas!",
    stepperList: [
      { title: "Detalhes", disabled: false, hidden: false },
      { title: "Fotos", disabled: started, hidden: false },
      { title: "Preços", disabled: started, hidden: false },
      { title: "Disponibilidade", disabled: started, hidden: false },
      { title: "Complementos", disabled: started, hidden: false },
    ],
  };
};

const initialState: ProductModel = {
  product_type: "",
  name: "",
  description: "",
  category_id: "",
  price: 0.0,
  status: StatusEntity.ACTIVE,
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
  const router = useRouter();
  const notify = useNotify();
  const params: any = useParams();
  const query: any = useSearchParams();
  const path: any = usePathname();

  // routes
  const CATEGORY_ID = params["category_uuid"];
  const STEP = query.get("step");

  if (CATEGORY_ID == null) {
    router.push(APP_ROUTES.DASHBOARD.MY_CATALOG);
  }

  const API_URI_CATEGORIES =
    API_ROUTES.CUSTOMER.CATALOG.CATEGORY + `/${CATEGORY_ID}`;
  const API_URI_PRODUCTS = API_ROUTES.CUSTOMER.CATALOG.PRODUCT;

  // routes

  // STATES
  const [formConfig, setFormConfig] = useState<FormConfig>({ category: null });
  const [loading, onLoading] = useState(false);

  const [nextStep, setNextStep] = useState<string | undefined>(STEP);

  // STATES

  // EFFECTS

  useEffect(() => {
    const type = query.get("type");
    const typeData = type ? productType[type] : {};
    const productData = {
      ...initialState,
      category_id: CATEGORY_ID,
      product_type: type,
    };
    const showForm =
      ObjectUtils.nonNull(type) || ObjectUtils.nonNull(productId)
        ? true
        : false;

    setFormConfig((cfg) => ({
      ...cfg,
      type,
      showForm,
      typeData,
      productData,
    }));
  }, [query]);

  useEffect(() => {
    if (ObjectUtils.nonNull(CATEGORY_ID)) {
      fetchGet(API_URI_CATEGORIES, {
        handleData: (category) =>
          setFormConfig((cfg) => ({ ...cfg, category })),
      });
    }

    if (ObjectUtils.nonNull(productId)) {
      fetchGet(API_URI_PRODUCTS + `/${productId}`, {
        handleData: (productData) =>
          setFormConfig((cfg) => ({ ...cfg, productData })),
        handleError,
      });
    }
  }, [params, productId]);

  useEffect(() => {
    if (nextStep == "2") {
      actionStep(2);
      router.replace(path);
    } else if (nextStep == "start" || nextStep == "update") {
      apiSendData(formConfig.productData);
    }
  }, [nextStep]);

  // END EFFECTS

  // form
  const [files, setFiles] = useState<any>();

  // API INTEGRATION
  const handleError = (error) => {
    notify({
      status: "error",
      description: error.message,
    });
  };

  const saveProduct = async (productData: ProductModel) => {
    let stp = ObjectUtils.isNull(productData.id) ? "start" : "update";
    await setFormConfig((cfg) => ({ ...cfg, productData }));
    setNextStep(stp);
  };

  const apiSendData = (product: ProductModel) => {
    fetchPost(API_URI_PRODUCTS, product, {
      onLoading,
      handleData: (productData) => {
        setFormConfig((cfg) => ({ ...cfg, productData }));
        nextStep == "start" &&
          router.replace(
            APP_ROUTES.DASHBOARD.PRODUCT_NEW +
              `/${CATEGORY_ID}/${productData.id}?step=2`
          );
        notify({
          status: "success",
          description: "Produto criado com sucesso!",
        });
      },
      handleError,
    });
  };

  //  API INTEGRATION - END

  // const PageCatalog: FC<Props> = ({ children }) => {
  const [screen, setScreen] = useState<screens>("home");
  const [screenContent, setScreenContent] = useState<ScreenContentProps>(
    StringUtils.isEmpty(productId)
      ? screenContentInitial
      : screenContentInitialUpdated(true)
  );
  const [selectedStep, setSelectedStep] = useState(1);

  const actionStep = useCallback(
    (ind: number) => {
      setScreenContent(
        screenContentInitialUpdated(ObjectUtils.isNull(productId))
      );

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
      {!formConfig.showForm && <ChoseProductTypePage />}

      {formConfig.showForm && (
        <Grid container splited vertical_spacing={8}>
          <Grid item xs={12}>
            <Divider mt="1rem" />
            <TitleCard
              goBack={APP_ROUTES.DASHBOARD.MY_CATALOG}
              title={screenContent?.title}
              text={screenContent?.hat}
            />
          </Grid>
        </Grid>
      )}

      {formConfig.showForm && (
        <FormToolbox
          justifyContent="end"
          // title="Ferramentas"
          icon="fa/solid/wrench"
          actions={[
            {
              title: "Ver meus itens",
              icon: "fa/solid/list-check",
              link: APP_ROUTES.DASHBOARD.MY_CATALOG,
            },
          ]}
        />
      )}

      {formConfig.showForm && screenContent?.stepperList && (
        <Grid container splited vertical_spacing={8}>
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

      {formConfig.showForm && ObjectUtils.nonNull(formConfig.productData) && (
        <NewProductItem
          category={formConfig.category}
          productType={formConfig.typeData}
          initialValues={formConfig.productData}
          files={files}
          setFiles={setFiles}
          submited={loading}
          page={screen}
          selectedStep={selectedStep}
          nextStep={(e: any) => {
            e.preventDefault();
            if (selectedStep < 5 && ObjectUtils.nonNull(productId)) {
              setSelectedStep(1 + selectedStep);
            }
          }}
          backScreenContent={(e: any) => {
            e.preventDefault();
            if (selectedStep > 0) {
              setSelectedStep(selectedStep - 1);
            }
          }}
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
