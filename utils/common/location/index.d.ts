import type { DistanceProps, GoogleGeocodeResponse, IGoogleGeocode, IKakaoAddress, IKakaoGeocode, IKakaoKeyword, KakaoAddressResponse, KakaoGeocodeResponse, KakaoKeywordResponse, Location as LocationProps } from './type';
declare class Location {
    private kakaoRestKey;
    private googleRestKey;
    private headers;
    setKeys({ kakaoRestKey, googleRestKey }: LocationProps): void;
    private setKakaoHeader;
    private parseGoogleGeocode;
    getKakaoLocationByAddress({ address, analyze_type, page, limit, kakaoRestKey, }: IKakaoAddress): Promise<{
        data: KakaoAddressResponse[];
        count: number;
    } | null>;
    getKakaoLocationByKeyword({ keyword, latitude, longitude, radius, page, limit, kakaoRestKey, }: IKakaoKeyword): Promise<{
        data: Array<KakaoKeywordResponse>;
        count: number;
    } | null>;
    getKakaoLocationByGeocode({ latitude, longitude, page, limit, kakaoRestKey, }: IKakaoGeocode): Promise<{
        data: KakaoGeocodeResponse;
        count: number;
    } | null>;
    getGoogleLocationByGeocode({ googleRestKey, latitude, longitude }: IGoogleGeocode): Promise<{
        data: GoogleGeocodeResponse[];
        count: any;
    } | null>;
    static getDistance({ target, current }: DistanceProps): number;
}
export { Location };
