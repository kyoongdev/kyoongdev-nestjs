import { Property } from '../validation';

export type SkipTake = {
  skip: number;
  take: number;
};

export class PagingDTO {
  @Property({ apiProperty: { type: 'number', minimum: 1, default: 1 } })
  page?: number;

  @Property({ apiProperty: { type: 'number', minimum: 20, default: 20 } })
  limit?: number;

  #skip: number;
  #take: number;

  set(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  public getSkipTake(): SkipTake {
    this.#take = Number(this.limit) || 20;
    this.#skip = (Number(this.page) - 1) * this.#take;

    return { skip: this.#skip, take: this.#take };
  }
}
