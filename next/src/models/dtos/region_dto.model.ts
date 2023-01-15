import { string } from "zod";
import BaseDbEntityDto from "./base_db_entity_dto.model";

export default class RegionDto extends BaseDbEntityDto {
  public name: string;
}
