import BaseDbEntityDto from "./base_db_entity_dto.model";
import RegionDto from "./region_dto.model";

export default class HolidayDto extends BaseDbEntityDto {
  public date: Date;
  public name: string;
  public observedDate: Date;
  public region: RegionDto;
}
