import { PagingDTO } from './paging.dto';
export interface PagingMetaDTOInterface {
    paging: PagingDTO;
    count: number;
}
export declare class PagingMetaDTO {
    total: number;
    page: number;
    limit: number;
    skip: number;
    hasPrev: boolean;
    hasNext: boolean;
    constructor({ paging, count }: PagingMetaDTOInterface);
}
