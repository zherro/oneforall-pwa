import { Response } from "express";

export class IngestionData<E> {
  entityType: any;
  dtoType: any;
  createDtoType: any;
  updateDtoType: any;

  user: any;

  input: E | any;
  output: E | any;
  domain: E | any;

  method?: string;
  request?: Request;
  response?: Response;
  errors: any[] = [];
}

export interface MoreOneError {
  message: string;
  error: any;
}

export class IngestionDataBuilder<E> {
  private _ingestionData: IngestionData<E>;

  constructor() {
    this._ingestionData = new IngestionData<E>();
    this._ingestionData.errors = [];
  }

  static of(ingestionData?: IngestionData<any>) {
    const ingest = new IngestionDataBuilder();
    ingest._ingestionData = ingestionData
      ? ingestionData
      : new IngestionData<any>();
    return ingest;
  }

  public build(): IngestionData<E> {
    return this._ingestionData;
  }

  public addInput(value: any): IngestionDataBuilder<E> {
    this._ingestionData.input = value;
    return this;
  }

  public addUser(value: any): IngestionDataBuilder<E> {
    this._ingestionData.user = value;
    return this;
  }

  public addOutput(value: E | any): IngestionDataBuilder<E> {
    this._ingestionData.output = value;
    return this;
  }

  public addDomain(value: E | any): IngestionDataBuilder<E> {
    this._ingestionData.domain = value;
    return this;
  }

  public addRrequest(value: E | any): IngestionDataBuilder<E> {
    this._ingestionData.request = value;
    return this;
  }

  public addResponse(value: E | any): IngestionDataBuilder<E> {
    this._ingestionData.response = value;
    return this;
  }

  public addErrors(value: any): IngestionDataBuilder<E> {
    this._ingestionData.errors.push(value);
    return this;
  }

  public addEntityType(value: any): IngestionDataBuilder<E> {
    this._ingestionData.entityType = value;
    return this;
  }

  public addDtoType(value: any): IngestionDataBuilder<E> {
    this._ingestionData.dtoType = value;
    return this;
  }

  public addCreateDtoType(value: any): IngestionDataBuilder<E> {
    this._ingestionData.createDtoType = value;
    return this;
  }

  public addUpdateDtoType(value: any): IngestionDataBuilder<E> {
    this._ingestionData.updateDtoType = value;
    return this;
  }
}
