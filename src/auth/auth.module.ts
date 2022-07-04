import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CoreModule } from "../core/core.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategyService } from "./jwt-strategy/jwt-strategy.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Usuario, UsuarioSchema } from "src/models/usuario.entity";

@Module({
  imports: [
    CoreModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
