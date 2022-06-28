import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  age?: number;
}
