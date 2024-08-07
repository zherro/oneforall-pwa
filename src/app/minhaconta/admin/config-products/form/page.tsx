import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import APP_ROUTES from "@routes/app.routes";
import FormConfigProduct from "@sections/form-data/config/FormConfigProduct";
import FormToolbox from "@sections/forms/FormToolbox";

export default function ConfigProductTablePage({
  edit = false,
  data,
}: {
  edit: boolean;
  data: any;
}) {
  return (
    <>
      <DashboardPageHeader
        splited
        divider
        title="Novo Produto"
        iconName="plus"
      />

      <FormToolbox
        justifyContent="end"
        // title="Ferramentas"
        icon="fa/solid/wrench"
        actions={[
          {
            title: "Ver Todos",
            icon: "fa/solid/list-check",
            link: APP_ROUTES.ADMIN.CONFIG_PRODUCTS_TABLE,
          },
        ]}
      />
      <FormConfigProduct edit={edit} data={data} />
    </>
  );
}
