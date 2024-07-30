import { FileData } from "@supabaseutils/model/FileData";
import SupabaseRepository from "@supabaseutils/types/repository";

export default class FileDataRepository extends SupabaseRepository<FileData> {
  constructor() {
    super("data_bucket");
  }
}
