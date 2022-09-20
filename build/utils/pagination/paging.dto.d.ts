export declare type SkipTake = {
    skip: number;
    take: number;
};
export declare class PagingDTO {
    #private;
    page?: number;
    limit?: number;
    getSkipTake(): SkipTake;
}
