"use client"
import { useParams } from "next/navigation";
import NewProductPage from "../page";

const EditProductPage = () => {
    const params: any = useParams();
    const productId = params["product_id"];

    console.log('veio aqui sim')

    return <NewProductPage productId={productId} />;
}
 
export default EditProductPage;