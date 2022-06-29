import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AgenciesService } from "./agencies.service";
import { AgencyDto } from "src/models/agency.dto";
import { Agency } from "src/models/agency.interface";
import { ApiKeyGuard } from "./api-key.guard";

@Controller("agencies")
@UseGuards(ApiKeyGuard)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  getAll(): Agency[] {
    return this.agenciesService.selectAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.agenciesService.findById(id);
  }

  @Post()
  postAgency(
    @Body()
    agency: AgencyDto,
  ): Agency {
    return this.agenciesService.insert(agency);
  }
}
