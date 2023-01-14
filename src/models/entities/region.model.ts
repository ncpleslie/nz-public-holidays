import { Region as RegionModel } from "@prisma/client";
import RegionDto from "../dtos/region_dto.model";
import BaseDbEntity from "./base_db_entity.model";

export default class Region extends BaseDbEntity {
  constructor(region: RegionModel);
  constructor(region: RegionDto) {
    super(region);

    this.name = region.name;
  }

  public name: string;

  public toDto(): RegionDto {
    const dto = new RegionDto();
    dto.name = this.name;

    this.createDto(dto);

    return dto;
  }
}
