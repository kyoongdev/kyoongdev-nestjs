import { Property } from '../validation';
import { PagingMetaDTO, PagingMetaDTOInterface } from './meta.dto';

export class PaginationDTO<T extends object> {
  @Property({ apiProperty: { isArray: true } })
  data: T[];

  @Property({ apiProperty: { type: PagingMetaDTO } })
  paging: PagingMetaDTO;

  constructor(data: T[], { paging, count }: PagingMetaDTOInterface) {
    this.data = data;
    this.paging = new PagingMetaDTO({ paging, count });
  }
}
