import { Module } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { TripsController } from "./trips.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./entities/trip.entity";
import { CoreModule } from "src/core/core.module";
import { Booking } from "../bookings/entities/booking.entity";

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Trip, Booking])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
