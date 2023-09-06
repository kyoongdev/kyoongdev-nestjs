import { KakaoMeta, type DistanceProps, type GoogleGeocodeProps, type GoogleGeocodeResponse, type KakaoAddressProps, type KakaoAddressResponse, type KakaoGeocodeProps, type KakaoGeocodeResponse, type KakaoKeywordProps, type KakaoKeywordResponse, type LocationProps, type NaverGeocodeQuery, type NaverGeocodeResponse, type NaverLocationConfig, type NaverReverseGeocode, type NaverReverseGeocodeQuery } from './type';
declare class SocialLocationService {
    private readonly config;
    constructor(config: LocationProps);
    private getKakaoHeader;
    private getNaverHeader;
    getNaverLocation(params: NaverGeocodeQuery, config?: NaverLocationConfig): Promise<NaverGeocodeResponse>;
    getNaverReverseLocation(params: NaverReverseGeocodeQuery, config?: NaverLocationConfig): Promise<NaverReverseGeocode[] | null>;
    private parseGoogleGeocode;
    getKakaoLocationByAddress({ address, analyze_type, page, limit, kakaoRestKey, }: KakaoAddressProps): Promise<{
        data: KakaoAddressResponse[];
        count: number;
    } | null>;
    getKakaoLocationByKeyword({ keyword, latitude, longitude, radius, page, limit, kakaoRestKey, category_group_code, }: KakaoKeywordProps): Promise<{
        data: Array<KakaoKeywordResponse>;
        count: KakaoMeta;
    } | null>;
    getKakaoLocationByGeocode({ latitude, longitude, page, limit, kakaoRestKey, }: KakaoGeocodeProps): Promise<{
        data: KakaoGeocodeResponse;
        count: number;
    } | null>;
    getGoogleLocationByGeocode({ googleRestKey, latitude, longitude }: GoogleGeocodeProps): Promise<{
        data: GoogleGeocodeResponse[];
        count: any;
    } | null>;
    static getDistance({ target, current }: DistanceProps): number;
}
export { SocialLocationService };
