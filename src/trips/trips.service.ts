import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, Repository } from "typeorm";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { Trip } from "./entities/trip.entity";
import { UtilsService } from "../core/utils/utils.service";

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
    private readonly utilService: UtilsService,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const trip = this.tripRepository.create(createTripDto);
    trip.id = this.utilService.createGUID();
    await this.tripRepository.save(trip);
    return trip;
  }

  async findAll() {
    return await this.tripRepository.find();
  }

  async findOne(id: string) {
    const trip = await this.tripRepository.findOneBy({ id });
    if (!trip) {
      throw new EntityNotFoundError(Trip, id);
    }
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const trip = await this.findOne(id);
    const updated = {
      ...trip,
      ...updateTripDto,
    };
    return await this.tripRepository.save(updated);
  }

  async remove(id: string) {
    const trip = await this.findOne(id);
    return await this.tripRepository.remove(trip);
  }
}
