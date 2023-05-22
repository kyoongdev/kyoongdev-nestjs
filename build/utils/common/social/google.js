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
var Google_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = void 0;
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
let Google = Google_1 = class Google {
    constructor(props) {
        this.clientId = props.clientId;
        this.clientSecret = props.clientSecret;
        this.redirectUri = props.redirectUri;
    }
    getRest(res, redirectUrl) {
        if (!this.redirectUri && !redirectUrl) {
            throw { status: 500, message: 'Google Redirect Url is not defined' };
        }
        res.redirect(constant_1.GOOGLE_URL.AUTH(this.clientId, redirectUrl !== null && redirectUrl !== void 0 ? redirectUrl : this.redirectUri));
    }
    getToken(code) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clientSecret || this.redirectUri)
                throw { status: 500, message: 'Google Client Secret or Redirect Url is not defined' };
            const data = {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri,
                grant_type: 'authorization_code',
                code,
            };
            try {
                const response = yield axios_1.default.post(constant_1.GOOGLE_URL.TOKEN, data);
                return (_a = response.data) === null || _a === void 0 ? void 0 : _a.access_token;
            }
            catch (error) {
                return undefined;
            }
        });
    }
    static getAppUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(constant_1.GOOGLE_URL.USER_APP(token));
                const { id, email, name: nickname, picture: profileImage } = response.data;
                return {
                    id,
                    email,
                    nickname,
                    profileImage,
                };
            }
            catch (error) {
                const { response } = error;
                if (response.data.error === 'invalid_token')
                    throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
                return undefined;
            }
        });
    }
    static getWebUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = yield axios_1.default.get(constant_1.GOOGLE_URL.USER_WEB, { headers });
                const { id, email, name: nickname, picture: profileImage } = response.data;
                return {
                    id,
                    email,
                    nickname,
                    profileImage,
                };
            }
            catch (error) {
                const { response } = error;
                if (response.data.error === 'invalid_token')
                    throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
                return undefined;
            }
        });
    }
    getRestCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Google_1.getWebUser(code);
                if (!user) {
                    throw { status: 500, message: '구글 유저정보 발급 오류!' };
                }
                return { token: code, user };
            }
            catch (error) {
                return undefined;
            }
        });
    }
};
Google = Google_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], Google);
exports.Google = Google;
//# sourceMappingURL=google.js.map