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
var GoogleLogin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleLogin = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("./constant");
let GoogleLogin = GoogleLogin_1 = class GoogleLogin {
    constructor(props) {
        this.props = props;
    }
    getRest(res, redirectUrl) {
        var _a, _b, _c;
        if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.redirectUri) && !redirectUrl) {
            throw { status: 500, message: 'Google Redirect Url is not defined' };
        }
        if (!((_b = this.props) === null || _b === void 0 ? void 0 : _b.clientId)) {
            throw { status: 500, message: 'Google Client Id is not defined' };
        }
        res.redirect(constant_1.GOOGLE_URL.AUTH((_c = this.props) === null || _c === void 0 ? void 0 : _c.clientId, redirectUrl !== null && redirectUrl !== void 0 ? redirectUrl : this.props.redirectUri));
    }
    getToken(code) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.clientSecret) || !((_b = this.props) === null || _b === void 0 ? void 0 : _b.redirectUri) || !((_c = this.props) === null || _c === void 0 ? void 0 : _c.clientId))
                throw { status: 500, message: 'Google Client Secret or Redirect Url or ClientId is not defined' };
            const data = {
                client_id: this.props.clientId,
                client_secret: this.props.clientSecret,
                redirect_uri: this.props.redirectUri,
                grant_type: 'authorization_code',
                code,
            };
            try {
                const response = yield axios_1.default.post(constant_1.GOOGLE_URL.TOKEN, data);
                return (_d = response.data) === null || _d === void 0 ? void 0 : _d.access_token;
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
            try {
                const response = yield axios_1.default.get(`${constant_1.GOOGLE_URL.USER_WEB}?access_token=${token}`, {});
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
                const token = yield this.getToken(code);
                if (!token) {
                    throw { status: 500, message: '구글 유저정보 발급 오류!' };
                }
                const user = yield GoogleLogin_1.getWebUser(token);
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
GoogleLogin = GoogleLogin_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constant_1.GOOGLE_CONFIG)),
    __metadata("design:paramtypes", [Object])
], GoogleLogin);
exports.GoogleLogin = GoogleLogin;
//# sourceMappingURL=google.js.map