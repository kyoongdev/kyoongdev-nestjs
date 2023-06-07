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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
const common_1 = require("@nestjs/common");
const location_module_1 = require("./location.module");
const kakaoApi = axios_1.default.create({
    baseURL: 'https://dapi.kakao.com/v2/local',
});
const googleAPI = axios_1.default.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
});
let Location = class Location {
    constructor(config) {
        this.config = config;
    }
    getKakaoHeader(kakaoRestKey) {
        if (!this.config.kakaoRestKey && kakaoRestKey)
            throw { status: 500, message: 'Kakao Rest Key is not defined' };
        return {
            Authorization: `KakaoAK ${kakaoRestKey !== null && kakaoRestKey !== void 0 ? kakaoRestKey : this.config.kakaoRestKey}`,
        };
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
            const query = {
                query: address,
                analyze_type,
                page,
                size: limit,
            };
            const url = `/local/search/address?${query_string_1.default.stringify(query)}`;
            const response = yield kakaoApi.get(url, { headers: this.getKakaoHeader(kakaoRestKey) });
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
    getKakaoLocationByKeyword({ keyword, latitude, longitude, radius = 200, page = 1, limit = 20, kakaoRestKey, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                query: keyword,
                page,
                size: limit,
                x: longitude,
                y: latitude,
                radius,
            };
            const kakaoUrl = `/local/search/keyword?${query_string_1.default.stringify(query)}`;
            const response = yield kakaoApi.get(kakaoUrl, { headers: this.getKakaoHeader(kakaoRestKey) });
            if (!response)
                return null;
            return { data: response.data.documents, count: response.data.meta };
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
            const query = {
                latlng: `${latitude},${longitude}`,
                key: (_a = this.config.googleRestKey) !== null && _a !== void 0 ? _a : googleRestKey,
                language: 'ko',
            };
            const url = `/geocode/json?${query_string_1.default.stringify(query)}`;
            const response = yield googleAPI.get(url);
            if (!response)
                return null;
            return { data: this.parseGoogleGeocode(response.data.results), count: response.data.results.length };
        });
    }
    static getDistance({ target, current }) {
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
Location = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(location_module_1.LOCATION_CONFIG)),
    __metadata("design:paramtypes", [Object])
], Location);
exports.Location = Location;
//# sourceMappingURL=location.js.map