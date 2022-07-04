import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { MongoError } from "mongodb";

@Catch()
export class MongodbErrorFilter<MongoError> implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const { request, response } = this.getExpressData(host);
    const responseError = this.getResponseError(exception, request);
    response.status(responseError.statusCode).json(responseError);
  }

  private getExpressData(host: ArgumentsHost) {
    // Http specific
    const httpContext = host.switchToHttp();
    // Express specific
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    return { request, response };
  }

  private getResponseError(exception: MongoError, request: Request) {
    let status = HttpStatus.BAD_REQUEST;
    const MONGO_CONFLICT = 11000;
    const mongoException: any = exception as any;
    if (mongoException.code === MONGO_CONFLICT) {
      status = HttpStatus.CONFLICT;
    } else if (mongoException.name === "ValidationError") {
      status = HttpStatus.BAD_REQUEST;
    } else if ((mongoException.message as string).includes("not found")) {
      status = HttpStatus.NOT_FOUND;
    }

    const responseError = {
      statusCode: status,
      message: mongoException.message,
      path: request.url,
    };
    return responseError;
  }
}
