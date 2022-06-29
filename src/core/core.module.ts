import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import helmet from "helmet";
import { MonitorMiddleware } from "./middlewares/monitor.middleware";
import { UtilsService } from "./utils/utils.service";

@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 10 })],
  providers: [
    UtilsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],

  exports: [UtilsService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes("*");
    consumer.apply(MonitorMiddleware).forRoutes("*");
  }
}
