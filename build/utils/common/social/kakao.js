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
var KakaoLogin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoLogin = void 0;
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
let KakaoLogin = KakaoLogin_1 = class KakaoLogin {
    constructor(props) {
        this.redirectUrl = props.kakaoRedirectUrl;
        this.restKey = props.kakaoRestKey;
        this.secretKey = props.kakaoSecretKey;
        this.adminKey = props.kakaoAdminKey;
    }
    getRest(res, redirectUrl) {
        if (!this.redirectUrl && !redirectUrl) {
            throw { status: 500, message: 'Kakao Redirect Url is not defined' };
        }
        res.redirect(constant_1.KAKAO_URL.AUTH(this.restKey, redirectUrl !== null && redirectUrl !== void 0 ? redirectUrl : this.redirectUrl));
    }
    static getUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            };
            try {
                const response = yield axios_1.default.get(constant_1.KAKAO_URL.USER, {
                    headers,
                });
                const { id, properties, kakao_account: kakaoAccount } = response.data;
                return {
                    id,
                    kakaoAccount,
                    properties,
                };
            }
            catch (error) {
                return undefined;
            }
        });
    }
    getToken(code, redirectUrl) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = query_string_1.default.stringify({
                grant_type: 'authorization_code',
                client_id: this.restKey,
                client_secret: this.secretKey,
                redirectUri: redirectUrl || this.redirectUrl,
                code,
            });
            try {
                const response = yield axios_1.default.post(constant_1.KAKAO_URL.TOKEN, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                const token = (_a = response.data) === null || _a === void 0 ? void 0 : _a.access_token;
                return token;
            }
            catch (error) {
                return undefined;
            }
        });
    }
    getRestCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.getToken(code);
                if (!token) {
                    throw { status: 400, message: '카카오 토큰 발급 오류!' };
                }
                const user = yield KakaoLogin_1.getUser(token);
                if (!user) {
                    throw { status: 500, message: '카카오 유저정보 발급 오류!' };
                }
                return { token, user };
            }
            catch (error) {
                return undefined;
            }
        });
    }
    logout(id, adminKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!adminKey && !this.adminKey) {
                    throw { status: 500, message: '카카오 어드민키가 없습니다.' };
                }
                const headers = {
                    Authorization: `KakaoAK ${adminKey !== null && adminKey !== void 0 ? adminKey : this.adminKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                };
                const data = query_string_1.default.stringify({
                    target_id_type: 'user_id',
                    target_id: id,
                });
                yield axios_1.default.post(constant_1.KAKAO_URL.LOGOUT, data, { headers });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
};
KakaoLogin = KakaoLogin_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], KakaoLogin);
exports.KakaoLogin = KakaoLogin;
//# sourceMappingURL=kakao.js.map