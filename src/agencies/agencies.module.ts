import { Module } from "@nestjs/common";
import { AgenciesController } from "./agencies.controller";
import { AgenciesService } from "./agencies.service";
import { CoreModule } from "../core/core.module";

@Module({
  controllers: [AgenciesController],
  imports: [CoreModule],
  providers: [AgenciesService],
})
export class AgenciesModule {}
