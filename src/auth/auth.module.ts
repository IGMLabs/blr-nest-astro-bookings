import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CoreModule } from "../core/core.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [CoreModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
