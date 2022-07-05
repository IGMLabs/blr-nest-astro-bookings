import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from './core/core.module';
import { AgenciesModule } from './agencies/agencies.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [CoreModule, AgenciesModule, AuthModule, TripsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
