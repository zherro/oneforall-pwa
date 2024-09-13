import { StatusEntity } from "@supabaseutils/model/types/Status.type";

export default class UpdateCategoryStatus {
  categoryId: string;
  status: StatusEntity;
}
