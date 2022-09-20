import type { PagingMetaDTOInterface } from './meta.interface';
export declare class PagingMetaDTO {
    total: number;
    page: number;
    limit: number;
    skip: number;
    hasPrev: boolean;
    hasNext: boolean;
    constructor({ paging, count }: PagingMetaDTOInterface);
}
