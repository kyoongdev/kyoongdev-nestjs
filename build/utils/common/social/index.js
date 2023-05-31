"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLoginModule = exports.NaverLogin = exports.KakaoLogin = exports.GoogleLogin = exports.AppleLogin = void 0;
var apple_1 = require("./apple");
Object.defineProperty(exports, "AppleLogin", { enumerable: true, get: function () { return apple_1.AppleLogin; } });
var google_1 = require("./google");
Object.defineProperty(exports, "GoogleLogin", { enumerable: true, get: function () { return google_1.GoogleLogin; } });
var kakao_1 = require("./kakao");
Object.defineProperty(exports, "KakaoLogin", { enumerable: true, get: function () { return kakao_1.KakaoLogin; } });
var naver_1 = require("./naver");
Object.defineProperty(exports, "NaverLogin", { enumerable: true, get: function () { return naver_1.NaverLogin; } });
var social_module_1 = require("./social.module");
Object.defineProperty(exports, "SocialLoginModule", { enumerable: true, get: function () { return social_module_1.SocialLoginModule; } });
__exportStar(require("./type"), exports);
//# sourceMappingURL=index.js.map