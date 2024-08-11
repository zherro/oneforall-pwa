import {
  GroupedCategoryDTO,
  ProductDTO,
} from "@supabaseutils/model/dto/Cardapio.dto";
import { IngestionData } from "./processor/ingestion-data";
import { UnitProcessor } from "./processor/unit.processor";
import CategoriesRepository from "@supabaseutils/repositories/catalog/Categories.repository";
import { BusinessException } from "@supabaseutils/bussines.exception";
import ObjectUtils from "@utils/helpers/Object.utils";

export default class CardapioUseCase extends UnitProcessor<any> {
  protected async execute(
    ingestionData: IngestionData<any>
  ): Promise<IngestionData<any>> {
    const categoryRepository = new CategoriesRepository();

    const tenantId: string = await categoryRepository.getTenantId();

    const { data, error } = await categoryRepository
      .getSupabase()
      .from("vw_cardapio_tenant")
      .select("*")
      .eq("tenant_id", tenantId);

    if (error) {
      throw new BusinessException(
        "Ocorreu um erro inesperado ao tentar recuperar seu cardápio!"
      );
    }

    return { ...ingestionData, output: this.groupByCategory(data || []) };
  }

  private groupByCategory(products: ProductDTO[]): GroupedCategoryDTO[] {
    const grouped = products.reduce((acc, product) => {
      const {
        category_id,
        category,
        category_status,
        category_type,
        tenant_id,
      } = product;

      if (!acc[category_id]) {
        acc[category_id] = {
          category_id,
          category,
          category_status,
          category_type,
          tenant_id,
          products: [],
        };
      }

      if (ObjectUtils.nonNull(product.product_id)) {
        acc[category_id].products.push(product);
      }

      return acc;
    }, {} as { [key: string]: GroupedCategoryDTO });

    return Object.values(grouped);
  }
}

export const cardapioUseCase = (ingestionData: IngestionData<any>) =>
  new CardapioUseCase().process(ingestionData);
