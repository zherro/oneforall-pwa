"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import { Button } from "@component/buttons";
import useFetch from "@hook/useFetch";
import { useRouter } from "next/navigation";
import useNotify from "@hook/useNotify";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { ProfileForm } from "@sections/form-data/profile";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { LOG } from "@utils/log";

const initialValuesData: any = {
  name: "",
  slug: "",
  tags: "",
  description: "",
  type: "",
  status: StatusEntity.ACTIVE,
};
interface FormWrapperProps {
  edit: boolean;
  data?: any;
  app_uri: string;
  api_uri: string;
}

export default function FormWrapper({
  edit = false,
  data,
  app_uri,
  api_uri,
}: FormWrapperProps) {
  const router = useRouter();
  const notify = useNotify();
  const fetchData = useFetch();

  const [initialValues, setInitialvalues] = useState(
    edit ? data : initialValuesData
  );
  const [submited, setSubmited] = useState<boolean>(false);

  const saveSuccessCalback = (data) => {
    setSubmited(false);
    router.push(app_uri || "#");
  };

  const saveErroCalback = (data) => {
    setSubmited(false);
    notify({
      status: "error",
      description: data?.message,
    });
  };

  useEffect(() => {
    LOG.debug("Fetch data: ", data);
    setInitialvalues(data);
  }, [data, edit]);

  const save = (values: any) => {
    setSubmited(true);
    fetchData(
      api_uri,
      {
        method: "POST",
        body: JSON.stringify(values),
      },
      saveSuccessCalback,
      saveErroCalback
    );
  };

  const HEADER_LINK = (
    <FlexBox justifyContent="end" width="100%">
      <Link href={api_uri || "#"}>
        <Button
          width="18px"
          color="primary"
          bg="primary.light"
          px="2rem"
          mt="-6px"
          mr="0.5rem"
        >
          <Icon>arrow-left</Icon>
        </Button>
      </Link>
    </FlexBox>
  );

  return (
    <>
      <DashboardPageHeader
        title={edit ? "Perfil: " + (initialValues?.name || "") : "Novo Perfil"}
        iconName="delivery-box"
        button={HEADER_LINK}
      />
      <ProfileForm
        initialValues={initialValues}
        handleSubmit={save}
        submited={submited}
      />
    </>
  );
}
