export interface PagingQuery {
    page: number;
    limit: number;
}
export declare const Paging: (...dataOrPipes: any[]) => ParameterDecorator;
