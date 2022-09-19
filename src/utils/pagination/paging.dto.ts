import { Property } from 'utils/validation';

export type SkipTake = {
  skip: number;
  take: number;
};

export class PagingDTO {
  @Property({ apiProperty: { type: 'number', minimum: 1, default: 1 } })
  page?: number;

  @Property({ apiProperty: { type: 'number', minimum: 20, default: 20 } })
  limit?: number;
  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  public getSkipTake(): SkipTake {
    const take = Number(this.limit) || 20;
    const skip = (Number(this.page) - 1) * take;

    return { skip, take };
  }
}
