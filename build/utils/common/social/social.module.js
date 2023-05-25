"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SocialLoginModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLoginModule = void 0;
const common_1 = require("@nestjs/common");
const apple_1 = require("./apple");
const constant_1 = require("./constant");
const google_1 = require("./google");
const kakao_1 = require("./kakao");
const naver_1 = require("./naver");
let SocialLoginModule = SocialLoginModule_1 = class SocialLoginModule {
    static forFeature(config = {}) {
        const providers = this.createConfig(config);
        return {
            module: SocialLoginModule_1,
            providers,
            exports: providers,
        };
    }
    static createConfig(config = {}) {
        const providers = [];
        if (config.kakao)
            providers.push(this.createKakaoConfig(config.kakao));
        if (config.apple)
            providers.push(this.createAppleConfig(config.apple));
        if (config.google)
            providers.push(this.createGoogleConfig(config.google));
        if (config.naver)
            providers.push(this.createNaverConfig(config.naver));
        return providers;
    }
    static createKakaoConfig(kakao) {
        return {
            provide: constant_1.KAKAO_CONFIG,
            useValue: kakao,
        };
    }
    static createAppleConfig(apple) {
        return {
            provide: constant_1.APPLE_CONFIG,
            useValue: apple,
        };
    }
    static createGoogleConfig(google) {
        return {
            provide: constant_1.GOOGLE_CONFIG,
            useValue: google,
        };
    }
    static createNaverConfig(naver) {
        return {
            provide: constant_1.NAVER_CONFIG,
            useValue: naver,
        };
    }
};
SocialLoginModule = SocialLoginModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [kakao_1.KakaoLogin, apple_1.AppleLogin, google_1.GoogleLogin, naver_1.NaverLogin],
        exports: [kakao_1.KakaoLogin, apple_1.AppleLogin, google_1.GoogleLogin, naver_1.NaverLogin],
    })
], SocialLoginModule);
exports.SocialLoginModule = SocialLoginModule;
//# sourceMappingURL=social.module.js.map