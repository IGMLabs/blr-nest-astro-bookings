import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class BusinessErrorFilter<Error> implements ExceptionFilter {
  private readonly logger = new Logger("BusinessErrorFilter");

  catch(exception: Error, host: ArgumentsHost) {
    const errorMessage = "👮‍♂️" + (exception as any).message;
    // Http specific
    const httpContext = host.switchToHttp();
    // Express specific
    const response = httpContext.getResponse<Response>();
    this.logger.error(errorMessage);
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errorMessage,
    });
  }
}
