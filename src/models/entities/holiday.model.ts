import { HolidayModel } from "../../types/db.types";
import { formatDateToString } from "../../utils/helpers.util";
import HolidayDto from "../dtos/holiday_dto.model";
import BaseDbEntity from "./base_db_entity.model";
import Region from "./region.model";

export default class Holiday extends BaseDbEntity {
  constructor(holiday: HolidayModel) {
    super(holiday);

    this.date = new Date(holiday.date);
    this.name = holiday.name;
    this.observedDate = new Date(holiday.observedDate);
    this.region = new Region(holiday.region);
  }

  public date: Date;
  public name: string;
  public observedDate: Date;
  public region: Region;

  public toDto(): HolidayDto {
    const dto = new HolidayDto();
    dto.date = formatDateToString(this.date);
    dto.name = this.name;
    dto.observedDate = formatDateToString(this.observedDate);
    dto.region = this.region.toDto();

    this.createDto(dto);

    return dto;
  }
}
