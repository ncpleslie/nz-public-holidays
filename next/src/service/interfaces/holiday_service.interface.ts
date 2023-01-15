import HolidayDto from "../../models/dtos/holiday_dto.model";

export default interface IHolidayService {
  getAllHolidaysAsync(): Promise<Record<string, HolidayDto[]>>;
  getHolidaysByYearAsync(year: Date): Promise<HolidayDto[]>;
}
