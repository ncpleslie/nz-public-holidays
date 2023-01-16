import BaseDbEntityDto from "./base_db_entity_dto.model";
import RegionDto from "./region_dto.model";

/**
 * A holiday model returned by the API.
 */
export default class HolidayDto extends BaseDbEntityDto {
  /**
   * The official date of the holiday.
   */
  public date: string;

  /**
   * The official name of the holiday in a human-readable format.
   */
  public name: string;

  /**
   * The actual date the holiday occurs.
   */
  public observedDate: string;

  /**
   * The region the holiday is associated with.
   * "All" region means it is a country-wide holiday.
   */
  public region: RegionDto;
}
