import { IsNotEmpty, IsString } from "class-validator";
import { Usuario } from "./usuario.inerface";

export class LoginDto implements Partial<Usuario> {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
