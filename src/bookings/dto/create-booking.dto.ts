import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  client: string;

  @IsNumber()
  passengers?: number;

  @IsString()
  @IsNotEmpty()
  tripId: string;
}

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  bookingId: string;

  @IsString()
  @IsNotEmpty()
  card: string;

  @IsNumber()
  amount: number;
}
