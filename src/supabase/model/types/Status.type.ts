export enum StatusEntity {
  ACTIVE = "A",
  INACTIVE = "I",
  SUSPENSE = "S",
  DELETED = "D",
  PUBLISHED = "P",
  RACUNHO = "R",
  NEW_REGISTRY = "N",
  DRAFT = "R",
  ARCHIVED = "AR",
  PENDING = "PE",
  APPROVED = "AP",
  REJECTED = "RE",
}

const statusOf = (status: StatusEntity): string => {
  switch (status) {
    case StatusEntity.ACTIVE:
      return "ATIVO";
    case StatusEntity.INACTIVE:
      return "INATIVO";
    case StatusEntity.SUSPENSE:
      return "SUSPENSO";
    case StatusEntity.DELETED:
      return "EXCLUIDO";
    case StatusEntity.PUBLISHED:
      return "PUBLICADO";
    case StatusEntity.DRAFT:
      return "RASCUNHO";
    case StatusEntity.NEW_REGISTRY:
      return "NOVO_REGISTRO";
    case StatusEntity.ARCHIVED:
      return "ARQUIVADO";
    case StatusEntity.PENDING:
      return "PENDENTE";
    case StatusEntity.APPROVED:
      return "APROVADO";
    case StatusEntity.REJECTED:
      return "REJEITADO";
    default:
      return "Unknown status.";
  }
};

export default statusOf;

// // Example usage
// const statusDescription = statusOf(StatusEntity.ACTIVE);
// console.log(statusDescription); // Output: "The entity is active."
