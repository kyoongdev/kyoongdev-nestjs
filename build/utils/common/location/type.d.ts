export type KakaoAddressType = 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
export interface NaverLocationConfig {
    clientId: string;
    clientSecret: string;
}
export interface LocationProps {
    kakaoRestKey?: string;
    googleRestKey?: string;
    naver?: NaverLocationConfig;
}
export interface Pagination {
    page?: number;
    limit?: number;
}
export interface Geocode {
    latitude: string;
    longitude: string;
}
export interface GoogleGeocode {
    lat: number;
    lng: number;
}
export interface KakaoGeocode {
    x: string;
    y: string;
}
export interface DistanceProps {
    target: Geocode;
    current: Geocode;
}
interface Address {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_3depth_h_name: string;
}
interface Kakao {
    kakaoRestKey: string | undefined;
}
interface Google {
    googleRestKey: string | undefined;
}
interface KakaoAddress extends Address {
    h_code: string;
    b_code: string;
    moutain_yn: 'Y' | 'N';
    main_address_no: string;
    sub_address_no: string;
    x: string;
    y: string;
}
type KakaoRoadAddress = Pick<KakaoAddress, 'address_name' | 'region_1depth_name' | 'region_2depth_name' | 'region_3depth_name'> & {
    road_name: string;
    underground_yn: 'Y' | 'N';
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
};
export interface KakaoAddressResponse extends KakaoGeocode {
    address_name: string;
    address_type: KakaoAddressType;
    address: KakaoAddress;
}
export interface KakaoAddressProps extends Pagination, Kakao {
    address: string;
    analyze_type?: 'similar' | 'exact';
}
export declare const KAKAO_CATEGORY_CODE: {
    readonly 대형마트: "MT1";
    readonly 편의점: "CS2";
    readonly '\uC5B4\uB9B0\uC774\uC9D1, \uC720\uCE58\uC6D0': "PS3";
    readonly 학교: "SC4";
    readonly 학원: "AC5";
    readonly 주차장: "PK6";
    readonly '\uC8FC\uC720\uC18C, \uCDA9\uC804\uC18C': "OL7";
    readonly 지하철역: "SW8";
    readonly 은행: "BK9";
    readonly 문화시설: "CT1";
    readonly 중개업소: "AG2";
    readonly 공공기관: "PO3";
    readonly 관광명소: "AT4";
    readonly 숙박: "AD5";
    readonly 음식점: "FD6";
    readonly 카페: "CE7";
    readonly 병원: "HP8";
    readonly 약국: "PM9";
};
export interface KakaoKeywordProps extends Pagination, Geocode, Kakao {
    keyword: string;
    category_group_code?: keyof typeof KAKAO_CATEGORY_CODE;
    radius?: number;
}
export interface KakaoGeocodeProps extends Pagination, Geocode, Kakao {
}
export interface KakaoKeywordResponse extends KakaoGeocode {
    id: string;
    place_name: string;
    category_name: string;
    category_group_code: string;
    category_group_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    place_url: string;
    distance?: string;
}
export interface KakaoGeocodeResponse {
    address: KakaoAddress;
    road_address: KakaoRoadAddress;
}
export interface GoogleAddressComponents {
    long_name: string;
    short_name: string;
    types: Array<string>;
}
export interface GoogleGeometry {
    logcation: GoogleGeocode;
    location_type: string;
    viewport: {
        northeast: GoogleGeocode;
        southwest: GoogleGeocode;
    };
    place_id: string;
    pluse_code: {
        compound_code: string;
        global_code: string;
    };
    types: Array<string>;
}
export interface GoogleGeocodeProps extends Google, Geocode {
}
export interface GoogleGeocode {
    address_components: Array<GoogleAddressComponents>;
    formatted_address: string;
    geometry: any;
}
export interface GoogleGeocodeResponse extends Address {
    id: string;
}
export interface NaverAddressElement {
    types: string[];
    longName: string;
    shortName: string;
    code: string;
}
export interface NaverAddress {
    roadAddress: string;
    jibunAddress: string;
    englishAddress: string;
    x: string;
    y: string;
    distance: number;
    addressElements: NaverAddressElement[];
}
export interface NaverGeocodeResponse {
    status: string;
    meta: {
        totalCount: number;
        count: number;
        page: number;
    };
    addresses: NaverAddress[];
}
export interface NaverGeocodeQuery {
    query: string;
    coordinate?: Geocode;
    filter?: string;
    language?: string;
    page?: number;
    count?: number;
}
export interface NaverReverseGeocodeQuery {
    request?: string;
    coordinate: Geocode;
    sourcecrs?: string;
    targetcrs?: string;
    orders?: string;
    output?: string;
    callback?: string;
}
export interface NaverReverseGeocodeCode {
    id: string;
    type: string;
    mappingId: string;
}
export interface NaverReverseGeocodeArea {
    name: string;
    coords: {
        center: {
            crs: string;
            x: number;
            y: number;
        };
    };
}
export interface NaverReverseGeocodeRegion {
    area0: NaverReverseGeocodeArea;
    area1: NaverReverseGeocodeArea;
    area2: NaverReverseGeocodeArea;
    area3: NaverReverseGeocodeArea;
    area4: NaverReverseGeocodeArea;
}
export interface NaverReverseGeocode {
    name: string;
    code: NaverReverseGeocodeCode;
    region: NaverReverseGeocodeRegion;
}
export interface NaverReverseGeocodeResponse {
    status: {
        code: number;
        name: string;
        message: string;
    };
    results: NaverReverseGeocode[];
}
export {};
