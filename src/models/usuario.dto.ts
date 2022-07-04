import { IsNotEmpty, IsString } from "class-validator";
import { Usuario } from "./usuario.entity";

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
