import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Client } from "./models/client.interface";
import { BusinessErrorFilter } from "./core/filters/business-error.filter";
import { PositiveNumberPipe } from "./core/pipes/positive-number.pipe";
import { ClientDto } from "./models/client.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  public getTest(): string {
    return "Hola Test";
  }

  @Get("/param/:id")
  public getParam(@Param("id") id: string): string {
    const type = typeof id;
    return `Param: ${id} of type ${type}`;
  }

  @Get("/square/:someParam")
  public getSquare(@Param("someParam") someParam: number): string {
    const type = typeof someParam;
    const square = someParam * someParam;
    return `Square of ${someParam} of type ${type} is ${square}`;
  }

  @Get("/square/NaN/:someParam")
  public getSquareNaN(@Param("someParam") someParam: number): string {
    const someNumber = parseInt(someParam.toString());
    if (isNaN(someNumber)) {
      throw new HttpException(`${someParam} is not a number`, HttpStatus.BAD_REQUEST);
    }
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/square/pipe/:someParam")
  public getSquarePipe(@Param("someParam", ParseIntPipe) someNumber: number): string {
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/multiply/:someNumber/:otherNumber")
  public getMultiply(
    @Param("someNumber", ParseIntPipe) someNumber: number,
    @Param("otherNumber", ParseIntPipe) otherNumber: number,
  ): number {
    const multiply = someNumber * otherNumber;
    return multiply;
  }

  @Get("/multiply/query")
  public getMultiplyQuery(
    @Query("a", ParseIntPipe) someNumber: number,
    @Query("b", ParseIntPipe) otherNumber: number,
  ): number {
    return this.appService.multiply(someNumber, otherNumber);
  }

  @Get("/division/query")
  public getDivisionQuery(
    @Query("a", ParseIntPipe) someNumber: number,
    @Query("b", ParseIntPipe) otherNumber: number,
  ): number {
    if (someNumber == 0 || otherNumber == 0) {
      throw new HttpException(`${someNumber} and/or ${otherNumber} are under 1`, HttpStatus.BAD_REQUEST);
    }
    return this.appService.division(someNumber, otherNumber);
  }

  @Get("/division/filter/query")
  @UseFilters(BusinessErrorFilter)
  public getDivisionQueryFilter(
    @Query("a", ParseIntPipe) someNumber: number,
    @Query("b", ParseIntPipe) otherNumber: number,
  ): number {
    return this.appService.division2(someNumber, otherNumber);
  }

  @Get("/squareRoot/query")
  public getSquareRootQuery(@Query("a", ParseIntPipe) someNumber: number): number {
    if (someNumber < 1) {
      throw new HttpException(`${someNumber} is under 1`, HttpStatus.BAD_REQUEST);
    }
    return this.appService.squareRoot(someNumber);
  }

  @Get("/squareRoot/pipe/query")
  public getSquareRootQueryPipe(@Query("a", PositiveNumberPipe) someNumber: number): number {
    return this.appService.squareRoot(someNumber);
  }

  @Post("")
  public postHello(@Body() nombre: { name: string }): string {
    const type = typeof nombre;
    const nameString = JSON.stringify(nombre);
    return `${nombre} of type ${type} but is a ${nameString}`;
  }

  @Post("name")
  public postHelloName(@Body() payload: { name: string }): string {
    return `Hello ${payload.name}`;
  }

  @Post("client")
  public postClient(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    payload: ClientDto,
  ): Client {
    return this.appService.saveClient(payload);
  }

  @Put("client/:id")
  public putClient(@Param("id") clientId: string, @Body() payload: Client): Client {
    try {
      return this.appService.saveClient(payload);
    } catch (error) {
      const message: string = error.message;
      if (message.startsWith("Not found:")) throw new HttpException(message, HttpStatus.NOT_FOUND);
      else throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
