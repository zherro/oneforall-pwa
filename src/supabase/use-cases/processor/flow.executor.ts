import ObjectUtils from "@utils/helpers/Object.utils";
import { IngestionData } from "./ingestion-data";
import { UnitProcessor } from "./unit.processor";

export class FlowExecutor {
  _ingestionData: IngestionData<any>;
  processors: UnitProcessor<any>[];

  async execute(ingestionData: IngestionData<any>) {
    const safeProcesssors: UnitProcessor<any>[] = this.processors || [];

    for (let i = 0; i < safeProcesssors.length; i++) {
      let processor: UnitProcessor<any> = safeProcesssors[i];
      ingestionData = await processor.process(ingestionData);
    }

    if (
      ObjectUtils.nonNull(ingestionData?.errors) &&
      ingestionData?.errors?.length > 0
    ) {
      throw ingestionData.errors[0];
    }

    this._ingestionData = ingestionData;
    return ingestionData;
  }

  get errors() {
    return this._ingestionData.errors;
  }
}

export class FlowExecutorBuilder {
  flow: FlowExecutor = new FlowExecutor();

  constructor() {
    this.flow.processors = [];
  }

  digestFlow(processors: UnitProcessor<any>[]): FlowExecutorBuilder {
    this.flow.processors = processors;
    return this;
  }

  digest(processors: UnitProcessor<any>): FlowExecutorBuilder {
    this.flow.processors.push(processors);
    return this;
  }

  build() {
    return this.flow;
  }
}
