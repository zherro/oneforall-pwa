const productTypes = (setType: Function) => {
  return [
    {
      icon: "extra/pizza",
      title: "Pizza's",
      type: "pizza",
      description:
        "Preparamos um forma especial e facil de configurar todos os sabores de pizza's.",
      onClick: () => setType({ name: "Pizza's", type: "pizza", icon: "food" }),
    },
    {
      icon: "bottle",
      title: "Bebidas",
      type: "drink",
      description:
        "Cadastre as bebidas que você fornece, seja indutrializada ou de produção própria.",
      onClick: () => setType({ name: "Bebidas", type: "drink", icon: "food" }),
    },
    {
      icon: "extra/gas-tank",
      title: "Agua e Gás",
      type: "water-gas",
      description:
        "Cadastre todas as marcas disponiveis na sua loja, para alcançar ainda mais clientes.",
      onClick: () => setType({ name: "Bebidas", type: "drink", icon: "food" }),
    },
    {
      icon: "food",
      title: "Itens Gerais",
      type: "all",
      description:
        "Lanches, petiscos, bolos, doces e salgados. E também configure complementos.",
      onClick: () =>
        setType({ name: "Itens Gerais", type: "all", icon: "food" }),
    },
  ];
};

export default productTypes;
