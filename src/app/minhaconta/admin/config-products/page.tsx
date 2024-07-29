import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import APP_ROUTES from "@routes/app.routes";
import FormList from "@sections/forms/FormList";
import FormToolbox from "@sections/forms/FormToolbox";

const AdminConfigProducs = () => {
  return (
    <>
      <DashboardPageHeader
        title="Tabela de Produtos"
        iconName="fa/regular/rectangle-list"
        divider
      />

      <FormToolbox
        title="Ferramentas"
        icon="fa/solid/wrench"
        actions={[
          {
            title: " Criar Novo",
            icon: "plus",
            link: APP_ROUTES.ADMIN.CONFIG_PRODUCTS_TABLE_FORM,
          },
        ]}
      />

      <FormList />
    </>
  );
};

export default AdminConfigProducs;
