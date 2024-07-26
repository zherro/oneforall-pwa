import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import Badge from "./badge";
import { SemiSpan } from "./Typography";

const StatusLabel = ({ status }: { status?: StatusEntity }) => {
  switch (status) {
    case "A":
      return <Badge title="ATIVO">{""}</Badge>;
    case "I":
      return <Badge title="INSTIVO">{""}</Badge>;
    case "D":
      return <Badge title="EXCLUIDO">{""}</Badge>;
    case "P":
      return <SemiSpan color="success.main" size="0.5rem">PUBLICADO</SemiSpan>
    case "R":
      return <Badge title="RACUNHO">{""}</Badge>;
    case "S":
      return <Badge title="SUSPENSO">{""}</Badge>;

    default:
      return <>STATUS_INVALIDO</>;
  }
};

export default StatusLabel;
