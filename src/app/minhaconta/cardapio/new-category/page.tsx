"use client";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import CategoryForm from "@sections/cardapio/CategoryForm";

const NewCategoryPage = () => {
  return (
    <>
      <DashboardPageHeader title="Nova categoria" iconName="plus" />
      <CategoryForm />
    </>
  );
};

export default NewCategoryPage;
