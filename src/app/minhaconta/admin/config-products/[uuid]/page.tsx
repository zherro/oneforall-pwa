"use client";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import FormConfigProduct from "@sections/form-data/config/FormConfigProduct";
import FormToolbox from "@sections/forms/FormToolbox";
import { Suspense, useEffect, useState } from "react";
import { fetchGet } from "@hook/useFetch2";
import { useParams } from "next/navigation";
import useHandleError from "@hook/useHandleError";
import useNotify from "@hook/useNotify";

export default function ConfigProducEditPage({}) {
  const param = useParams();
  const notify = useNotify();

  const URI = API_ROUTES.ADMIN.CONFIG_PRODUCT_TABLE;
  const [data, handleData] = useState<any>();
  const [loading, onLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchGet(URI + `/${param["uuid"]}`, {
      handleData,
      handleError: useHandleError(notify),
      onLoading,
    });
  }, []);

  return (
    <>
      <DashboardPageHeader
        splited
        divider
        title="Editar Produto"
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

      <Suspense fallback={loading}>
        {data && <FormConfigProduct edit={true} data={data} />}
      </Suspense>
    </>
  );
}
