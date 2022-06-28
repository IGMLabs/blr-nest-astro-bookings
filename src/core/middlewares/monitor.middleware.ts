import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
@Injectable()
export class MonitorMiddleware implements NestMiddleware {
  private readonly logger = new Logger("MonitorMiddleware");

  // ! express specific
  public use(req: Request, res: Response, next: () => void) {
    const requestInfo = this.getRequestInfo(req);
    this.logger.log(requestInfo);
    const start = Date.now();
    const errorCode = 400;
    res.on("finish", () => {
      const responseInfo = this.getResponseInfo(res, start);
      this.logger.debug(responseInfo);
      if (res.statusCode > errorCode) {
        this.logError(res);
      }
    });
    next();
  }

  private logError(res: Response<any, Record<string, any>>) {
    const error = res.statusMessage;
    const errorInfo = `${res.statusCode} - ${error}`;
    this.logger.warn(errorInfo);
  }

  private getResponseInfo(res: Response<any, Record<string, any>>, start: number) {
    const contentLength = res.get("content-length") || 0;
    const end = Date.now();
    const elapsed = end - start;
    const responseInfo = `${elapsed} ms ${contentLength} bs`;
    return responseInfo;
  }

  private getRequestInfo(req) {
    const { ip, originalUrl, method } = req;
    const userAgent = req.headers["user-agent"] || "unknown";
    const requestInfo = `${ip} ${userAgent} [${method}]: ${originalUrl}`;
    return requestInfo;
  }
}
