import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UtilsService } from "src/core/utils/utils.service";
import { Credentials } from "src/models/credentials.interface";
import { UsuarioDto } from "src/models/usuario.dto";
import { Usuario } from "src/models/usuario.entity";
import { LoginDto } from "../models/login.dto";

@Injectable()
export class AuthService {
  // private readonly usuarios: Usuario[] = [];

  constructor(
    private utilService: UtilsService,
    private readonly jwtService: JwtService,
    @InjectModel(Usuario.name) private readonly userModel: Model<Usuario>,
  ) {}

  public async login(usuario: LoginDto) {
    const usuarioDB: Usuario = await this.userModel.findOne({ email: usuario.email, password: usuario.password });
    if (!usuarioDB) {
      throw new Error("Usuario o contraseña incorrectos");
    }
    return this.buildCredentials(usuarioDB);
  }

  public async register(usuario: UsuarioDto) {
    const newUsuario: Usuario = await this.userModel.create({
      id: this.utilService.createGUID(),
      ...usuario,
    });

    await newUsuario.save();
    return this.buildCredentials(newUsuario);
  }

  public async getUser(id: string): Promise<Usuario> {
    const usuarioDB: Usuario = await this.userModel.findOne({ id });
    if (!usuarioDB) {
      throw new Error("Usuario o contraseña not found");
    }
    return usuarioDB;
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
