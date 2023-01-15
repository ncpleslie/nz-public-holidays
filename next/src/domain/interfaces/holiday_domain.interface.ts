import Holiday from "../../models/entities/holiday.model";

export default interface IHolidayDomain {
  getHolidaysAsync(year?: Date): Promise<Holiday[]>;
}
