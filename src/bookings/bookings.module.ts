import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { Payment } from "./entities/payment.entity";
import { Trip } from "../trips/entities/trip.entity";
import { CoreModule } from "../core/core.module";

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Booking, Trip, Payment])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
