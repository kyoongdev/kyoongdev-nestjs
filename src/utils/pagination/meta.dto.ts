import { isNaN } from 'lodash';
import { Property } from '../validation';
import { PagingDTO } from './paging.dto';
export interface PagingMetaDTOInterface {
  paging: PagingDTO;
  count: number;
}

export class PagingMetaDTO {
  @Property({ apiProperty: { type: 'number' } })
  total: number;

  @Property({ apiProperty: { type: 'number' } })
  page: number;

  @Property({ apiProperty: { type: 'number' } })
  limit: number;

  @Property({ apiProperty: { type: 'number' } })
  skip: number;

  @Property({ apiProperty: { type: 'boolean' } })
  hasPrev: boolean;

  @Property({ apiProperty: { type: 'boolean' } })
  hasNext: boolean;

  constructor({ paging, count }: PagingMetaDTOInterface) {
    this.total = count;
    this.page = isNaN(Number(paging.page)) ? 1 : Number(paging.page);
    this.limit = isNaN(Number(paging.limit)) ? 10 : Number(paging.limit);
    this.skip = paging.getSkipTake().skip;
    this.hasPrev = this.page > 1;
    this.hasNext = this.page * this.limit < count;
  }
}
