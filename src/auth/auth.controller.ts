import { Body, Controller, Post, HttpException, HttpStatus, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "src/models/login.dto";
import { UsuarioDto } from "src/models/usuario.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() login: LoginDto) {
    try {
      return this.authService.login(login);
    } catch (error) {
      const message: string = error.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("/register")
  register(@Body() register: UsuarioDto) {
    try {
      return this.authService.register(register);
    } catch (error) {
      const message: string = error.message;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get("/me")
  @UseGuards(AuthGuard("jwt"))
  public getCurrentUser(@Req() req: any) {
    return "Holis " + req.user;
  }
}
