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
    return new Response(
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
}

const httpResponse = new HttpResponse();
export default httpResponse;
