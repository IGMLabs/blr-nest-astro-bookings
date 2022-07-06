import { Injectable, Logger } from "@nestjs/common";
import { CreateBookingDto, CreatePaymentDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";
import { Payment } from "./entities/payment.entity";
import { UtilsService } from "../core/utils/utils.service";
import { Repository, EntityNotFoundError, Connection } from "typeorm";
import { Trip } from "../trips/entities/trip.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BookingsService {
  private logger = new Logger("BookingService");

  constructor(
    private utilService: UtilsService,
    @InjectRepository(Booking) private bookingsRepository: Repository<Booking>,
    @InjectRepository(Trip) private tripsRepository: Repository<Trip>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private connection: Connection,
  ) {}

  // eslint-disable-next-line max-lines-per-function
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    this.logger.debug("creating", createBookingDto);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const booking: Booking = this.bookingsRepository.create(createBookingDto);
    this.logger.debug("created Booking", booking);
    try {
      await queryRunner.startTransaction();
      const trip: Trip = await this.tripsRepository.findOneBy({ id: createBookingDto.tripId });
      this.bookTripPlaces(trip, createBookingDto, booking);
      await this.tripsRepository.save(trip);
      await this.bookingsRepository.save(booking);
      await queryRunner.commitTransaction();
    } catch (dbError) {
      this.logger.debug(dbError);
      await queryRunner.rollbackTransaction();
      throw dbError;
    } finally {
      await queryRunner.release();
    }
    return booking;
  }

  // eslint-disable-next-line max-lines-per-function
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const payment: Payment = this.paymentRepository.create(createPaymentDto);
    try {
      await queryRunner.startTransaction();
      const booking: Booking = await this.bookingsRepository.findOneBy({ id: createPaymentDto.bookingId });
      console.log(booking);
      this.paymentPlaces(payment, createPaymentDto, booking);
      await this.bookingsRepository.save(booking);
      await this.tripsRepository.save(booking.trip);
      await this.paymentRepository.save(payment);
      await queryRunner.commitTransaction();
    } catch (dbError) {
      await queryRunner.rollbackTransaction();
      throw dbError;
    } finally {
      await queryRunner.release();
    }
    return payment;
  }

  private paymentPlaces(payment: Payment, createPaymentDto: CreatePaymentDto, booking: Booking) {
    if (!booking) throw new EntityNotFoundError(Trip, createPaymentDto.bookingId);
    console.log(booking.trip.price);
    if (booking.trip.price - payment.amount < 0) throw new Error("Business: Over payment");
    booking.trip.price -= createPaymentDto.amount;
    payment.id = this.utilService.createGUID();
    payment.booking = booking;
  }

  private bookTripPlaces(trip: Trip, createBookingDto: CreateBookingDto, booking: Booking) {
    if (!trip) throw new EntityNotFoundError(Trip, createBookingDto.tripId);
    if (trip.places < createBookingDto.passengers) throw new Error("Business: Not enough places");
    trip.places -= createBookingDto.passengers;
    booking.id = this.utilService.createGUID();
    booking.trip = trip;
  }

  async findAll() {
    return await this.bookingsRepository.find();
  }

  async findOne(id: string) {
    const booking = await this.bookingsRepository.findOne({
      where: { id: id },
      relations: { trip: true },
    });
    if (!booking) throw new EntityNotFoundError(Booking, id);
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);
    const updated = {
      ...booking,
      ...updateBookingDto,
    };
    return await this.bookingsRepository.save(updated);
  }

  async remove(id: string) {
    const booking = await this.findOne(id);
    return await this.bookingsRepository.remove(booking);
  }
}
