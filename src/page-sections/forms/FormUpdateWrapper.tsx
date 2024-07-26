"use client";
import useFetch from "@hook/useFetch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormWrapper from "./FormWrapper";

const FormUpdateWrapper = ({ api_uri, app_uri }) => {
  const params = useParams();
  const fetchData = useFetch();

  const [submited, setSubmited] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  const getCategorySuccessCalback = (data) => {
    setSubmited(false);
    if (data.length > 0) {
      setData(data[0]);
    }
  };

  const getCategoryErroCalback = (data) => {
    setSubmited(false);
  };

  const getArticleById = () => {
    setSubmited(true);
    fetchData(
      `${api_uri}/${params?.["uuid"]}`,
      {},
      getCategorySuccessCalback,
      getCategoryErroCalback
    );
  };

  useEffect(() => {
    getArticleById();
  }, []);

  return <FormWrapper edit api_uri="api_uri" app_uri="app_uri" data={data} />;
};

export default FormUpdateWrapper;
