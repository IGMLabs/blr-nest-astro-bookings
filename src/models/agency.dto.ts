import { IsNotEmpty, IsString } from "class-validator";
import { Agency } from "./agency.interface";

export class AgencyDto implements Partial<Agency> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
