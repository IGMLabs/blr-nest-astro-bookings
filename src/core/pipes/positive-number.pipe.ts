import { ArgumentMetadata, HttpException, HttpStatus, Injectable, ParseIntPipe, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveNumberPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const numberValue = await new ParseIntPipe().transform(value, metadata);

    if (numberValue < 0) {
      throw new HttpException(`${value} is not a positive number`, HttpStatus.BAD_REQUEST);
    }
    return numberValue;
  }

  //   const numberValue = parseInt(value);
  //   if (isNaN(numberValue)) {
  //     throw new HttpException(`${value} is not a number`, HttpStatus.BAD_REQUEST);
  //   }
  //   if (numberValue < 0) {
  //     throw new HttpException(`${value} is not a positive number`, HttpStatus.BAD_REQUEST);
  //   }
  //   return numberValue;
  // }
}
