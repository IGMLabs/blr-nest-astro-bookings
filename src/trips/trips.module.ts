import { Module } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { TripsController } from "./trips.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./entities/trip.entity";
import { CoreModule } from "src/core/core.module";

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
