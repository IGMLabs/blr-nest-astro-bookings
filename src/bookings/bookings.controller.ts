import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto, CreatePaymentDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@Controller("bookings")
export class BookingsController {
  private logger = new Logger("BookingsController");
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    this.logger.debug("creating", createBookingDto);
    return this.bookingsService.create(createBookingDto);
  }

  @Post("/payment")
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.bookingsService.createPayment(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookingsService.remove(id);
  }
}
