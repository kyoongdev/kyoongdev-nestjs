"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLocationService = void 0;
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const type_1 = require("./type");
const kakaoApi = axios_1.default.create({
    baseURL: 'https://dapi.kakao.com/v2/local',
});
const googleAPI = axios_1.default.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
});
const naverApi = axios_1.default.create({
    baseURL: 'https://naveropenapi.apigw.ntruss.com',
});
let SocialLocationService = class SocialLocationService {
    constructor(config) {
        this.config = config;
    }
    getKakaoHeader(kakaoRestKey) {
        if (!this.config.kakaoRestKey && !kakaoRestKey)
            throw { status: 500, message: 'Kakao Rest Key is not defined' };
        return {
            Authorization: `KakaoAK ${kakaoRestKey !== null && kakaoRestKey !== void 0 ? kakaoRestKey : this.config.kakaoRestKey}`,
        };
    }
    getNaverHeader(config) {
        var _a, _b, _c, _d;
        if (!((_a = this.config.naver) === null || _a === void 0 ? void 0 : _a.clientId) && !(config === null || config === void 0 ? void 0 : config.clientId) && !((_b = this.config.naver) === null || _b === void 0 ? void 0 : _b.clientSecret) && !(config === null || config === void 0 ? void 0 : config.clientSecret))
            throw { status: 500, message: 'Naver Client ID is not defined' };
        return {
            'X-NCP-APIGW-API-KEY-ID': (config === null || config === void 0 ? void 0 : config.clientId) || ((_c = this.config.naver) === null || _c === void 0 ? void 0 : _c.clientId),
            'X-NCP-APIGW-API-KEY': (config === null || config === void 0 ? void 0 : config.clientSecret) || ((_d = this.config.naver) === null || _d === void 0 ? void 0 : _d.clientSecret),
        };
    }
    getNaverLocation(params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coordinate } = params, rest = __rest(params, ["coordinate"]);
            const { data } = yield naverApi.get('/map-geocode/v2/geocode', {
                headers: this.getNaverHeader(config),
                params: Object.assign(Object.assign({}, rest), { coordinate: coordinate ? `${coordinate.longitude},${coordinate.latitude}` : undefined }),
            });
            return data;
        });
    }
    getNaverReverseLocation(params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coordinate } = params, rest = __rest(params, ["coordinate"]);
            const { data } = yield naverApi.get('/map-reversegeocode/v2/gc', {
                headers: this.getNaverHeader(config),
                params: Object.assign(Object.assign({}, rest), { coords: `${coordinate.longitude},${coordinate.latitude}` }),
            });
            if (data.status.code !== 0)
                return null;
            return data.results;
        });
    }
    parseGoogleGeocode(data) {
        const result = [];
        data.forEach((row) => {
            const tmpResult = {
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
                }
                else if (addressComponent.types.includes('sublocality_area_level_2')) {
                    tmpResult.region_2depth_name = addressComponent.long_name;
                }
                else if (addressComponent.types.includes('sublocality_level_1')) {
                    tmpResult.region_3depth_name = addressComponent.long_name;
                }
                else if (addressComponent.types.includes('sublocality_level_2')) {
                    tmpResult.region_3depth_h_name = addressComponent.long_name;
                }
            });
            result.push(tmpResult);
        });
        return result;
    }
    getKakaoLocationByAddress({ address, analyze_type = 'similar', page = 1, limit = 20, kakaoRestKey, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                query: address,
                analyze_type,
                page,
                size: limit,
            };
            const response = yield kakaoApi.get('/search/address', {
                params,
                headers: this.getKakaoHeader(kakaoRestKey),
            });
            if (!response)
                return null;
            const documents = response.data.documents;
            return {
                data: documents.length === 0
                    ? []
                    : documents.map((item) => item.road_address),
                count: response.data.meta,
            };
        });
    }
    getKakaoLocationByKeyword({ keyword, latitude, longitude, radius = 200, page = 1, limit = 20, kakaoRestKey, category_group_code, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign(Object.assign({ query: keyword, page, size: limit }, (longitude &&
                latitude && {
                x: longitude,
                y: latitude,
                radius,
            })), { category_group_code: category_group_code && type_1.KAKAO_CATEGORY_CODE[category_group_code] });
            const response = yield kakaoApi.get('/search/keyword', {
                params,
                headers: this.getKakaoHeader(kakaoRestKey),
            });
            if (!response)
                return null;
            return {
                data: response.data.documents,
                count: Object.assign(Object.assign({}, response.data.meta), { page }),
            };
        });
    }
    getKakaoLocationByGeocode({ latitude, longitude, page = 1, limit = 20, kakaoRestKey, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { x: longitude, y: latitude, page, size: limit };
            const url = `/geo/coord2address?${query_string_1.default.stringify(query)}`;
            const response = yield axios_1.default.get(url, { headers: this.getKakaoHeader(kakaoRestKey) });
            return { data: response.data.documents, count: response.data.meta };
        });
    }
    getGoogleLocationByGeocode({ googleRestKey, latitude, longitude }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!googleRestKey && this.config.googleRestKey)
                throw { status: 500, message: 'Google Rest Key is not defined' };
            const params = {
                latlng: `${latitude},${longitude}`,
                key: (_a = this.config.googleRestKey) !== null && _a !== void 0 ? _a : googleRestKey,
                language: 'ko',
            };
            const response = yield googleAPI.get('/geocode/json', {
                params,
            });
            if (!response)
                return null;
            return { data: this.parseGoogleGeocode(response.data.results), count: response.data.results.length };
        });
    }
    getDistance({ target, current }) {
        if (!target.latitude || !target.longitude)
            return 0;
        if (target.latitude === current.latitude && target.longitude === current.longitude)
            return 0;
        const { latitude: lat2, longitude: lon2 } = target;
        const { latitude: lat1, longitude: lon1 } = current;
        const radLat1 = (Math.PI * Number(lat1)) / 180;
        const radLat2 = (Math.PI * Number(lat2)) / 180;
        const theta = Number(lon1) - Number(lon2);
        const radTheta = (Math.PI * theta) / 180;
        let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1)
            dist = 1;
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100)
            dist = Math.round(dist / 10) * 10;
        else
            dist = Math.round(dist / 100) * 100;
        return Number((dist / 1000).toFixed(3));
    }
};
SocialLocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.LOCATION_CONFIG)),
    __metadata("design:paramtypes", [Object])
], SocialLocationService);
exports.SocialLocationService = SocialLocationService;
//# sourceMappingURL=location.js.map