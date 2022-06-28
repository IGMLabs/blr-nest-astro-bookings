import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { AgenciesService } from "./agencies.service";
import { AgencyDto } from "src/models/agency.dto";
import { Agency } from "src/models/agency.interface";

@Controller("agencies")
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
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    agency: AgencyDto,
  ): Agency {
    return this.agenciesService.insert(agency);
  }
}
