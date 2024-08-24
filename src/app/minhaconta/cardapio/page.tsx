"use client";
import { fetchGet } from "@hook/useFetch2";
import { API_ROUTES } from "@routes/app.routes";
import CardapioWelcome from "@sections/cardapio/CardapioWelcome";
import PageCatalogFood from "@sections/cardapio/food";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StoryLoadBoard from "../StoryLoadBoard";

const CardapioHome = () => {
  const query = useSearchParams();

  const URI = API_ROUTES.CATALOG.EXIST_CATALOG_FOR_TENANT;
  const [loading, onLoading] = useState<boolean>(true);
  const [showCatalog, hasCatalog] = useState<boolean>(false);

  useEffect(() => {
    if (query.get("start") == "true") {
      fetchGet(URI, {
        notify: true,
        headers: {},
        handleData: (data) => {
          hasCatalog(true);
        },
        handleError: (error) => {
          hasCatalog(false);
        },
        onLoading,
      });
    } else {
      hasCatalog(true);
    }
  }, []);

  return (
    <>
      {query.get("start") == "true" && loading && <StoryLoadBoard />}
      {query.get("start") == "true" && showCatalog != true && !loading && (
        <CardapioWelcome />
      )}
      {(query.get("start") !== "true" || showCatalog) && (
        <PageCatalogFood start={query.get("ido") == "true"} />
      )}
    </>
  );
};

export default CardapioHome;
