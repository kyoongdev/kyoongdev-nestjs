import axios from 'axios';
import queryString from 'query-string';

import { Inject, Injectable } from '@nestjs/common';

import { LOCATION_CONFIG } from './constants';
import type {
  DistanceProps,
  GoogleGeocode,
  GoogleGeocodeResponse,
  IGoogleGeocode,
  IKakaoAddress,
  IKakaoGeocode,
  IKakaoKeyword,
  KakaoAddressResponse,
  KakaoGeocodeResponse,
  KakaoKeywordResponse,
  LocationProps,
  NaverGeocodeQuery,
  NaverGeocodeResponse,
  NaverLocationConfig,
  NaverReverseGeocode,
  NaverReverseGeocodeQuery,
  NaverReverseGeocodeResponse,
} from './type';

const kakaoApi = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
});

const googleAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

const naverApi = axios.create({
  baseURL: 'https://naveropenapi.apigw.ntruss.com',
});

@Injectable()
class SocialLocationService {
  constructor(@Inject(LOCATION_CONFIG) private readonly config: LocationProps) {}

  private getKakaoHeader(kakaoRestKey?: string) {
    if (!this.config.kakaoRestKey && !kakaoRestKey) throw { status: 500, message: 'Kakao Rest Key is not defined' };

    return {
      Authorization: `KakaoAK ${kakaoRestKey ?? this.config.kakaoRestKey}`,
    };
  }

  private getNaverHeader(config?: NaverLocationConfig) {
    if (!this.config.naver?.clientId && !config?.clientId && !this.config.naver?.clientSecret && !config?.clientSecret)
      throw { status: 500, message: 'Naver Client ID is not defined' };
    return {
      'X-NCP-APIGW-API-KEY-ID': config?.clientId || this.config.naver?.clientId,
      'X-NCP-APIGW-API-KEY': config?.clientSecret || this.config.naver?.clientSecret,
    };
  }

  public async getNaverLocation(
    params: NaverGeocodeQuery,
    config?: NaverLocationConfig
  ): Promise<NaverGeocodeResponse> {
    const { coordinate, ...rest } = params;
    const { data } = await naverApi.get<NaverGeocodeResponse>('/map-geocode/v2/geocode', {
      headers: this.getNaverHeader(config),
      params: {
        ...rest,
        coordinate: coordinate ? `${coordinate.longitude},${coordinate.latitude}` : undefined,
      },
    });
    return data;
  }

  public async getNaverReverseLocation(
    params: NaverReverseGeocodeQuery,
    config?: NaverLocationConfig
  ): Promise<NaverReverseGeocode[] | null> {
    const { coordinate, ...rest } = params;
    const { data } = await naverApi.get<NaverReverseGeocodeResponse>('/map-reversegeocode/v2/gc', {
      headers: this.getNaverHeader(config),
      params: {
        ...rest,
        coords: `${coordinate.longitude},${coordinate.latitude}`,
      },
    });

    if (data.status.code !== 0) return null;

    return data.results;
  }

  private parseGoogleGeocode(data: GoogleGeocode[]): Array<GoogleGeocodeResponse> {
    const result: Array<GoogleGeocodeResponse> = [];

    data.forEach((row) => {
      const tmpResult: GoogleGeocodeResponse = {
        id: '',
        address_name: row.formatted_address || '',
        region_1depth_name: '',
        region_2depth_name: '',
        region_3depth_name: '',
        region_3depth_h_name: '',
      };
      const addressComponents = row.address_components;
      addressComponents.forEach((addressComponent) => {
        if (addressComponent.types.includes('administrative_area_level_1')) {
          tmpResult.region_1depth_name = addressComponent.long_name;
        } else if (addressComponent.types.includes('sublocality_area_level_2')) {
          tmpResult.region_2depth_name = addressComponent.long_name;
        } else if (addressComponent.types.includes('sublocality_level_1')) {
          tmpResult.region_3depth_name = addressComponent.long_name;
        } else if (addressComponent.types.includes('sublocality_level_2')) {
          tmpResult.region_3depth_h_name = addressComponent.long_name;
        }
      });

      result.push(tmpResult);
    });

    return result;
  }

  public async getKakaoLocationByAddress({
    address,
    analyze_type = 'similar',
    page = 1,
    limit = 20,
    kakaoRestKey,
  }: IKakaoAddress): Promise<{ data: KakaoAddressResponse[]; count: number } | null> {
    const query = {
      query: address,
      analyze_type,
      page,
      size: limit,
    };

    const url = `/local/search/address?${queryString.stringify(query)}`;

    const response = await kakaoApi.get(url, { headers: this.getKakaoHeader(kakaoRestKey) });
    if (!response) return null;

    const documents = response.data.documents;
    return {
      data:
        documents.length === 0
          ? []
          : documents.map((item: { road_address: KakaoAddressResponse }) => item.road_address),
      count: response.data.meta,
    };
  }

  public async getKakaoLocationByKeyword({
    keyword,
    latitude,
    longitude,
    radius = 200,
    page = 1,
    limit = 20,
    kakaoRestKey,
  }: IKakaoKeyword): Promise<{ data: Array<KakaoKeywordResponse>; count: number } | null> {
    const query = {
      query: keyword,
      page,
      size: limit,
      x: longitude,
      y: latitude,
      radius,
    };

    const kakaoUrl = `/local/search/keyword?${queryString.stringify(query)}`;

    const response = await kakaoApi.get(kakaoUrl, { headers: this.getKakaoHeader(kakaoRestKey) });
    if (!response) return null;

    return { data: response.data.documents, count: response.data.meta };
  }

  public async getKakaoLocationByGeocode({
    latitude,
    longitude,
    page = 1,
    limit = 20,
    kakaoRestKey,
  }: IKakaoGeocode): Promise<{ data: KakaoGeocodeResponse; count: number } | null> {
    const query = { x: longitude, y: latitude, page, size: limit };
    const url = `/geo/coord2address?${queryString.stringify(query)}`;

    const response = await axios.get(url, { headers: this.getKakaoHeader(kakaoRestKey) });

    return { data: response.data.documents, count: response.data.meta };
  }

  public async getGoogleLocationByGeocode({ googleRestKey, latitude, longitude }: IGoogleGeocode) {
    if (!googleRestKey && this.config.googleRestKey) throw { status: 500, message: 'Google Rest Key is not defined' };

    const query = {
      latlng: `${latitude},${longitude}`,
      key: this.config.googleRestKey ?? googleRestKey,
      language: 'ko',
    };

    const url = `/geocode/json?${queryString.stringify(query)}`;
    const response = await googleAPI.get(url);

    if (!response) return null;

    return { data: this.parseGoogleGeocode(response.data.results), count: response.data.results.length };
  }

  static getDistance({ target, current }: DistanceProps): number {
    if (!target.latitude || !target.longitude) return 0;

    if (target.latitude === current.latitude && target.longitude === current.longitude) return 0;

    const { latitude: lat2, longitude: lon2 } = target;
    const { latitude: lat1, longitude: lon1 } = current;

    const radLat1 = (Math.PI * Number(lat1)) / 180;
    const radLat2 = (Math.PI * Number(lat2)) / 180;
    const theta = Number(lon1) - Number(lon2);
    const radTheta = (Math.PI * theta) / 180;
    let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return Number((dist / 1000).toFixed(3));
  }
}

export { SocialLocationService };
