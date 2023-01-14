import { Holiday as HolidayModel } from "@prisma/client";
import HolidayDto from "../dtos/holiday_dto.model";
import BaseDbEntity from "./base_db_entity.model";

export default class Holiday extends BaseDbEntity {
  constructor(holiday: HolidayModel);
  constructor(holiday: HolidayDto) {
    super(holiday);

    this.name = holiday.name;
  }

  public name: string;

  public toDto(): HolidayDto {
    const dto = new HolidayDto();
    dto.name = this.name;

    this.createDto(dto);

    return dto;
  }
}
