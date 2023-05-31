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
var NaverLogin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaverLogin = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("./constant");
let NaverLogin = NaverLogin_1 = class NaverLogin {
    constructor(props) {
        this.props = props;
    }
    getRest(res, code, redirectUrl) {
        var _a, _b;
        if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.redirectUrl) && !redirectUrl)
            throw { status: 500, message: 'Naver Redirect Url is not defined' };
        if (!((_b = this.props) === null || _b === void 0 ? void 0 : _b.clientId))
            throw { status: 500, message: 'Naver Client Id is not defined' };
        res.redirect(constant_1.NAVER_URL.AUTH(code, redirectUrl !== null && redirectUrl !== void 0 ? redirectUrl : this.props.redirectUrl, this.props.clientId));
    }
    static getUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            };
            try {
                const response = yield axios_1.default.get(constant_1.NAVER_URL.USER, { headers });
                const naverResponse = response.data.response;
                return naverResponse;
            }
            catch (err) {
                return undefined;
            }
        });
    }
    getToken(code) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.clientSecret))
                    throw { status: 500, message: 'Naver Client Secret is not defined' };
                if (!((_b = this.props) === null || _b === void 0 ? void 0 : _b.clientId))
                    throw { status: 500, message: 'Naver Client Id is not defined' };
                const response = yield axios_1.default.get(constant_1.NAVER_URL.TOKEN(this.props.clientId, this.props.clientSecret, code));
                const token = (_c = response.data) === null || _c === void 0 ? void 0 : _c.access_token;
                const tokenType = (_d = response.data) === null || _d === void 0 ? void 0 : _d.token_type;
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
                if (!tokenInfo || !tokenInfo.token) {
                    throw { status: 400, message: '네이버 토큰 발급 오류!' };
                }
                const user = yield NaverLogin_1.getUser(tokenInfo.token);
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
NaverLogin = NaverLogin_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constant_1.NAVER_CONFIG)),
    __metadata("design:paramtypes", [Object])
], NaverLogin);
exports.NaverLogin = NaverLogin;
//# sourceMappingURL=naver.js.map