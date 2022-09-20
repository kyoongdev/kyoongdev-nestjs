import { PagingMetaDTO } from './meta.dto';
import { PagingMetaDTOInterface } from './meta.interface';
export declare class PaginationDTO<T extends object> {
    data: T[];
    paging: PagingMetaDTO;
    constructor(data: T[], { paging, count }: PagingMetaDTOInterface);
}
