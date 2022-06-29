import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UtilsService } from "src/core/utils/utils.service";
import { Credentials } from "src/models/credentials.interface";
import { UsuarioDto } from "src/models/usuario.dto";
import { Usuario } from "src/models/usuario.inerface";
import { LoginDto } from "../models/login.dto";

@Injectable()
export class AuthService {
  private readonly usuarios: Usuario[] = [
    {
      id: "12345",
      name: "manolo",
      email: "test1@test.com",
      password: "12345",
    },
  ];
  constructor(private utilService: UtilsService, private readonly jwtService: JwtService) {}

  public login(usuario: LoginDto) {
    const usuarioDB = this.usuarios.find(
      (usuarioDb) => usuarioDb.email === usuario.email && usuarioDb.password === usuario.password,
    );
    if (!usuarioDB) {
      throw new Error("Usuario o contraseña incorrectos");
    }
    return this.buildCredentials(usuarioDB);
  }

  public register(usuario: UsuarioDto) {
    const usuarioDB = this.usuarios.find((usuarioDb) => usuarioDb.email === usuario.email);
    if (usuarioDB) {
      throw new Error("Ese usuario ya existe");
    }

    const newUsuario = {
      id: this.utilService.createGUID(),
      ...usuario,
    };
    this.usuarios.push(newUsuario);
    return this.buildCredentials(newUsuario);
  }

  public buildCredentials(user: Usuario): Credentials {
    const credentials = {
      id: user.id,
      token: this.createToken(user),
    };
    return credentials;
  }

  public createToken(user: Usuario): string {
    const payload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, { expiresIn: "5m", secret: "secret" });
    //return JSON.stringify(payload);
  }
}
