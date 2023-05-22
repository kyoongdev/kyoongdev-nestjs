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
var Naver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Naver = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("./constant");
let Naver = Naver_1 = class Naver {
    constructor(props) {
        this.clientId = props.clientId;
        this.clientSecret = props.clientSecret;
        this.redirectUrl = props.redirectUrl;
    }
    getRest(res, code, redirectUrl) {
        if (!this.redirectUrl && !redirectUrl)
            throw { status: 500, message: 'Naver Redirect Url is not defined' };
        res.redirect(constant_1.NAVER_URL.AUTH(code, redirectUrl !== null && redirectUrl !== void 0 ? redirectUrl : this.redirectUrl, this.clientId));
    }
    static getUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            };
            try {
                const response = yield axios_1.default.get(constant_1.NAVER_URL.USER, { headers });
                const { response: naverResponse } = response.data;
                const { id, email, gender, age, mobile: phoneNumber } = naverResponse;
                return {
                    id,
                    email,
                    gender,
                    age,
                    phoneNumber,
                };
            }
            catch (err) {
                return undefined;
            }
        });
    }
    getToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.clientSecret)
                    throw { status: 500, message: 'Naver Client Secret is not defined' };
                const response = yield axios_1.default.get(constant_1.NAVER_URL.TOKEN(code, this.clientId, this.clientSecret));
                const { access_token: token, token_type: tokenType } = response.data;
                return { token, tokenType };
            }
            catch (err) {
                return undefined;
            }
        });
    }
    getRestCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenInfo = yield this.getToken(code);
                if (!tokenInfo) {
                    throw { status: 400, message: '네이버 토큰 발급 오류!' };
                }
                const user = yield Naver_1.getUser(tokenInfo.token);
                if (!user) {
                    throw { status: 500, message: '네이버 유저정보 발급 오류!' };
                }
                return Object.assign(Object.assign({}, tokenInfo), { user });
            }
            catch (error) {
                return undefined;
            }
        });
    }
};
Naver = Naver_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], Naver);
exports.Naver = Naver;
//# sourceMappingURL=naver.js.map