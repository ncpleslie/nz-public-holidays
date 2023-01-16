import BaseDbEntityDto from "./base_db_entity_dto.model";

/**
 * The region a holiday occurs.
 * This model is returned by the API.
 */
export default class RegionDto extends BaseDbEntityDto {
  /**
   * The name of the region the holiday occurs.
   * "All" region means it is a country-wide holiday.
   */
  public name: string;
}
