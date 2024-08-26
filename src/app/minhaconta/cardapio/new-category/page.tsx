"use client";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import CategoryForm from "@sections/cardapio/CategoryForm";

const NewCategoryPage = ({ uuid, data }: { uuid?: string; data?: any }) => {
  return (
    <>
      <DashboardPageHeader splited title="Nova categoria" iconName="plus" />
      <CategoryForm uuid={uuid} data={data} />
    </>
  );
};

export default NewCategoryPage;
