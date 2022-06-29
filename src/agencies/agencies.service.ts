import { Injectable } from "@nestjs/common";
import { AgencyDto } from "src/models/agency.dto";
import { Agency } from "src/models/agency.interface";
import { UtilsService } from "../core/utils/utils.service";

@Injectable()
export class AgenciesService {
  private readonly agencies: Agency[] = [
    {
      id: "pepe",
      name: "manolo",
    },
  ];

  constructor(private utilService: UtilsService) {}
  private readonly STRING_BASE = 36;

  public selectAll(): Agency[] {
    return this.agencies;
  }

  public findById(id: string): Agency {
    return this.agencies.find((agency) => agency.id === id);
  }

  public insert(agency: AgencyDto): Agency {
    const newAgency = {
      id: this.utilService.createGUID(),
      ...agency,
    };
    this.agencies.push(newAgency);
    return newAgency;
  }
}
