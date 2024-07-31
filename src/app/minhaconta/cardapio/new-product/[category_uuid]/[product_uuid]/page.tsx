"use client";
import { useParams } from "next/navigation";
import NewProductPage from "../page";

const EditProductPage = () => {
  const params: any = useParams();

  // routes
  const PRODUCT_ID = params["product_uuid"];

  return <NewProductPage productId={PRODUCT_ID} />;
};

export default EditProductPage;
