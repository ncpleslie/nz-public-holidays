import { HolidayModel } from "../../types/db.types";
import HolidayDto from "../dtos/holiday_dto.model";
import BaseDbEntity from "./base_db_entity.model";
import Region from "./region.model";

export default class Holiday extends BaseDbEntity {
  constructor(holiday: HolidayModel);
  constructor(holiday: HolidayDto) {
    super(holiday);

    this.date = holiday.date;
    this.name = holiday.name;
    this.observedDate = holiday.observedDate;
    this.region = new Region(holiday.region);
  }

  public date: Date;
  public name: string;
  public observedDate: Date;
  public region: Region;

  public toDto(): HolidayDto {
    const dto = new HolidayDto();
    dto.date = this.date;
    dto.name = this.name;
    dto.observedDate = this.observedDate;
    dto.region = this.region.toDto();

    this.createDto(dto);

    return dto;
  }
}
