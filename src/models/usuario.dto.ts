import { IsNotEmpty, IsString } from "class-validator";
import { Usuario } from "./usuario.inerface";

export class UsuarioDto implements Partial<Usuario> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
