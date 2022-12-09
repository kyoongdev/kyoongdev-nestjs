export declare type SkipTake = {
    skip: number;
    take: number;
};
export declare class PagingDTO {
    page?: number;
    limit?: number;
    constructor(page: number, limit: number);
    getSkipTake(): SkipTake;
}
