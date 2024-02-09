import HolidayDto from "../../models/dtos/holiday_dto.model";

export default interface IHolidayService {
  getAllAsync(): Promise<Record<string, HolidayDto[]>>;
  getByYearAsync(year: Date): Promise<HolidayDto[]>;
}
