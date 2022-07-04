import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AgencyDto } from "src/models/agency.dto";
import { Agency } from "src/models/agency.entity";
import { UtilsService } from "../core/utils/utils.service";

@Injectable()
export class AgenciesService {
  constructor(
    private utilService: UtilsService,
    @InjectModel(Agency.name) private readonly agencyModel: Model<Agency>,
  ) {}

  public async selectAll(): Promise<Agency[]> {
    return await this.agencyModel.find();
  }

  public async findById(id: string): Promise<Agency> {
    return await this.agencyModel.findById(id);
  }

  public async insert(agency: AgencyDto) {
    const newAgency: Agency = await this.agencyModel.create({
      id: this.utilService.createGUID(),
      ...agency,
    });

    await newAgency.save();
    return newAgency;
  }
}
