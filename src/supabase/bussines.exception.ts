import HttpStatusCode from "@utils/http/HttpStatusCode";

export class BusinessException extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status || HttpStatusCode.BAD_REQUEST;
  }
}
