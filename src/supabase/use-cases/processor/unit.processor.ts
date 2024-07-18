import { BusinessException } from "@supabaseutils/bussines.exception";
import { IngestionData } from "./ingestion-data";
import Processor from "./processor";
import { LOG } from "@utils/log";
import ObjectUtils from "@utils/helpers/Object.utils";

export abstract class UnitProcessor<E> implements Processor<E> {
  constructor(private readonly processErros: boolean = false) {}

  public async process(
    ingestionData: IngestionData<E>
  ): Promise<IngestionData<E>> {
    return await this._safeProcess(ingestionData);
  }

  protected abstract execute(
    ingestionData: IngestionData<E>
  ): Promise<IngestionData<E>>;

  private async _safeProcess(
    ingestionData: IngestionData<E>
  ): Promise<IngestionData<E>> {
    try {
      if (
        !this.processErros &&
        ObjectUtils.nonNull(ingestionData?.errors) &&
        ingestionData?.errors?.length > 0
      ) {
        return ingestionData;
      }

      return await this.execute(ingestionData);
    } catch (_error: any) {
      return this.handleBussinesException(_error, ingestionData);
    }
  }

  protected handleBussinesException(
    _error: any,
    ingestionData: IngestionData<E>
  ) {
    const error =
      _error instanceof BusinessException
        ? _error
        : new BusinessException("Unexpected processor error!", 500);
    ingestionData.errors.push(error);
    LOG.error("Unexpected processor error: ", _error);
    return ingestionData;
  }
}
