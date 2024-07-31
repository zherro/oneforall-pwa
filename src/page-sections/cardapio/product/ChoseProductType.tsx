import TitleCard from "@component/cards/TitleCard";
import CatalogSelectorBox from "@component/catalog/CatalogSelectorBox";
import Grid from "@component/grid/Grid";
import productTypes from "@data/productTypes";
import APP_ROUTES from "@routes/app.routes";
import { usePathname, useRouter } from "next/navigation";

const ChoseProductTypePage = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <>
      <Grid container splited spacing={8}>
        <Grid item xs={12}>
          <TitleCard
            goBack={APP_ROUTES.DASHBOARD.MY_CATALOG}
            title="Qual o tipo do produto?"
            text="Para cada tipo de produto, preparamos um modo especial de facilitar as coisas pra você!"
          />
        </Grid>
      </Grid>
      <CatalogSelectorBox
        options={productTypes((a) => {}).map((pt) => ({
          ...pt,
          onClick: (type) => router.push(path + "?type=" + type),
        }))}
      />
    </>
  );
};

export default ChoseProductTypePage;
