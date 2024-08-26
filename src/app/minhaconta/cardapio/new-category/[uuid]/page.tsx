"use client";
import { useParams } from "next/navigation";
import NewCategoryPage from "../page";
import { useEffect, useState } from "react";
import { fetchGet } from "@hook/useFetch2";
import StringUtils from "@utils/helpers/String.utils";
import useNotify from "@hook/useNotify";
import useHandleError from "@hook/useHandleError";
import { API_ROUTES } from "@routes/app.routes";

const EditCategory = () => {
  const params: any = useParams();
  const notify = useNotify();
  const URI = API_ROUTES.CUSTOMER.CATALOG.CATEGORY;
  const [data, handleData] = useState<any>();
  const [loading, onLoading] = useState<boolean>(true);

  // routes
  const CATEGORY_ID = params["uuid"];

  useEffect(() => {
    if (!StringUtils.isEmpty(CATEGORY_ID)) {
      fetchGet(URI + `/${CATEGORY_ID}`, {
        notify: true,
        headers: {},
        handleData,
        handleError: useHandleError(notify),
        onLoading,
      });
    }
  }, []);

  return !loading && <NewCategoryPage uuid={CATEGORY_ID} data={data} />;
};

export default EditCategory;
