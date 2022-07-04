import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { AgenciesService } from "./agencies.service";
import { AgencyDto } from "src/models/agency.dto";
import { ApiKeyGuard } from "./api-key.guard";
import { MongodbErrorFilter } from "../core/filters/mongodb-error.filter";

@Controller("agencies")
@UseFilters(MongodbErrorFilter)
@UseGuards(ApiKeyGuard)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  async getAll() {
    return await this.agenciesService.selectAll();
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    return await this.agenciesService.findById(id);
  }

  @Post()
  async postAgency(
    @Body()
    agency: AgencyDto,
  ) {
    return await this.agenciesService.insert(agency);
  }
}
