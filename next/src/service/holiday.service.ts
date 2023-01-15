import HolidayDto from "../models/dtos/holiday_dto.model";
import IHolidayDomain from "../domain/interfaces/holiday_domain.interface";
import IHolidayService from "./interfaces/holiday_service.interface";

export default class HolidayService implements IHolidayService {
  constructor(protected holidayDomain: IHolidayDomain) {}

  public async getAllHolidaysAsync(): Promise<Record<string, HolidayDto[]>> {
    const holidays = await this.holidayDomain.getHolidaysAsync();

    return holidays.reduce(
      (prevHolidays: Record<string, HolidayDto[]>, currentHoliday) => {
        const currentHolidayDto = currentHoliday.toDto();
        const yearKey = currentHolidayDto.date.getFullYear();
        if (prevHolidays[yearKey]) {
          prevHolidays[yearKey]?.push(currentHolidayDto);

          return prevHolidays;
        }

        prevHolidays[yearKey] = [currentHolidayDto];

        return prevHolidays;
      },
      {} as Record<string, HolidayDto[]>
    );
  }

  public async getHolidaysByYearAsync(year: Date): Promise<HolidayDto[]> {
    const holidays = await this.holidayDomain.getHolidaysAsync(year);

    return holidays.map((holiday) => holiday.toDto());
  }
}
