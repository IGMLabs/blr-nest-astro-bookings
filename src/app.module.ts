import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from './core/core.module';
import { AgenciesModule } from './agencies/agencies.module';

@Module({
  imports: [CoreModule, AgenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
