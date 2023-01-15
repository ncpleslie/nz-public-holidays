import BaseDbEntityDto from "./base_db_entity_dto.model";
import RegionDto from "./region_dto.model";

export default class HolidayDto extends BaseDbEntityDto {
  public date: string;
  public name: string;
  public observedDate: string;
  public region: RegionDto;
}
