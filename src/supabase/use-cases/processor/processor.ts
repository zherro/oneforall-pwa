import { IngestionData } from './ingestion-data';

export default interface Processor<E> {
  process(
    ingestionData: IngestionData<E> | IngestionData<E>[],
  ): Promise<IngestionData<E>>;
}
