import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

export class ExpressFilter {
  protected request!: Request;
  protected response!: Response;
  protected extractExpressData(host: ArgumentsHost) {
    // ! http specific
    const httpContext = host.switchToHttp();
    // ! express specific
    this.response = httpContext.getResponse<Response>();
    this.request = httpContext.getRequest<Request>();
  }
  protected sendResponseError(responseError: ResponseError, logger: Logger) {
    logger.error(responseError);
    this.response.status(responseError.statusCode).json(responseError);
  }
}

@Catch()
export class BusinessErrorFilter<Error> extends ExpressFilter implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    this.extractExpressData(host);
    const responseError = this.getResponseError(exception);
    this.sendResponseError(responseError, new Logger("BusinessErrorFilter"));
  }

  private getResponseError(exception: Error): ResponseError {
    const status = HttpStatus.BAD_REQUEST;
    const errorMessage = "👮🏼‍♂️ " + (exception as any).message;
    const responseError = {
      statusCode: status,
      message: errorMessage,
      path: this.request.url,
    };
    return responseError;
  }
}

export interface ResponseError {
  statusCode: number;
  message: string;
  path?: string;
}
