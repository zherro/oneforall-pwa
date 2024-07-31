import { NextResponse } from "next/server";
import HttpStatusCode from "./HttpStatusCode";

class HttpResponse {
  private statusCode: number;
  private msg: string | any;

  constructor() {
    this.statusCode = HttpStatusCode.OK;
  }

  status(status: HttpStatusCode) {
    this.statusCode = status;
    return this;
  }

  message(msg: string | any) {
    this.msg = msg;
    return this;
  }

  send() {
    return new NextResponse(
      JSON.stringify({
        statusCode: this.statusCode,
        message: this.msg,
      }),
      {
        status: this.statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  ok(body?: any) {
    return this.responsePayload(HttpStatusCode.OK, body);
  }

  accepted(body?: any): NextResponse {
    return this.responsePayload(HttpStatusCode.ACCEPTED, body);
  }

  private responsePayload(status: HttpStatusCode, body?: any) {
    return NextResponse.json(body ? JSON.stringify(body) : "{}", { status });
  }

  error(status?: HttpStatusCode, msg?: string) {
    return new NextResponse(
      JSON.stringify({
        statusCode: status || 500,
        message: msg || "Não conseguimos completar as solicitação!",
      }),
      {
        status: status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  errorMsg(msg?: string, status?: HttpStatusCode): any {
    return {
      statusCode: status || 500,
      message: msg || "Não conseguimos completar as solicitação!",
    };
  }
}

const httpResponse = new HttpResponse();
export default httpResponse;
