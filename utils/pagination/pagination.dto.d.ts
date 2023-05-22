import { PagingMetaDTO, PagingMetaDTOInterface } from './meta.dto';
export declare class PaginationDTO<T extends object> {
    data: T[];
    paging: PagingMetaDTO;
    constructor(data: T[], { paging, count }: PagingMetaDTOInterface);
}
