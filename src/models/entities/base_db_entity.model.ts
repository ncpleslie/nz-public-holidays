import BaseDbEntityDto from "../dtos/base_db_entity_dto.model";

export default abstract class BaseDbEntity {
  constructor(baseDbEntityDto: BaseDbEntityDto) {
    this.id = baseDbEntityDto.id;
  }

  public id: string;

  protected createDto<TDto extends BaseDbEntityDto>(dto: TDto): void {
    dto.id = this.id;
  }
}
