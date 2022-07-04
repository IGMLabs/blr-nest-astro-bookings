import { Module } from "@nestjs/common";
import { AgenciesController } from "./agencies.controller";
import { AgenciesService } from "./agencies.service";
import { CoreModule } from "../core/core.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Agency, AgencySchema } from "../models/agency.entity";

@Module({
  controllers: [AgenciesController],
  imports: [CoreModule, MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }])],
  providers: [AgenciesService],
})
export class AgenciesModule {}
