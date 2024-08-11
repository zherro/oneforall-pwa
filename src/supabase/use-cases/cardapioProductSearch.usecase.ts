import { IngestionData } from "./processor/ingestion-data";
import { UnitProcessor } from "./processor/unit.processor";
import { BusinessException } from "@supabaseutils/bussines.exception";
import ObjectUtils from "@utils/helpers/Object.utils";
import ProductRepository from "@supabaseutils/repositories/catalog/Product.repository";
import { supabaseQuerys } from "@utils/SupabaseQuerys";
import StringUtils from "@utils/helpers/String.utils";

export default class CardapioSearchUseCase extends UnitProcessor<any> {
  protected async execute(
    ingestionData: IngestionData<any>
  ): Promise<IngestionData<any>> {
    const textQuery = ingestionData.input;
    this.validateQuery(textQuery);

    const productRepository = new ProductRepository();
    const tenantId: string = await productRepository.getTenantId();

    const fts = supabaseQuerys.fulltextSearchQuery(
      StringUtils.replaceSpecialChars(textQuery).toLowerCase() || ""
    );

    const { data, error } = await productRepository
      .getSupabase()
      .from("vw_cardapio_tenant")
      .select("*")
      .eq("tenant_id", tenantId)
      .textSearch("tsv_search", fts, {
        config: "english",
      });

    if (error) {
      throw new BusinessException(
        "Ocorreu um erro inesperado ao tentar consultar os produtos!"
      );
    }

    return { ...ingestionData, output: data };
  }

  validateQuery(textQuery) {
    if (ObjectUtils.isNull(textQuery) || textQuery.length < 3) {
      throw new BusinessException(
        "Informe ao menos 3 caracteres para realizar a busca!"
      );
    }
  }
}

export const cardapioSearchUseCase = async (
  ingestionData: IngestionData<any>
) => await new CardapioSearchUseCase().process(ingestionData);
