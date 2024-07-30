"use client";
import CardapioWelcome from "@sections/cardapio/CardapioWelcome";
import PageCatalogFood from "@sections/cardapio/food";
import { useSearchParams } from "next/navigation";

const CardapioHome = () => {
  const query = useSearchParams();

  return (
    <>
      {query.get("start") == "true" && <CardapioWelcome />}
      {query.get("start") !== "true" && <PageCatalogFood />}
    </>
  );
};

export default CardapioHome;
