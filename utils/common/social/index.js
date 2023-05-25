"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleLogin = exports.NaverLogin = exports.GoogleLogin = exports.KakaoLogin = exports.SocialLogin = void 0;
const apple_1 = require("./apple");
Object.defineProperty(exports, "AppleLogin", { enumerable: true, get: function () { return apple_1.AppleLogin; } });
const google_1 = require("./google");
Object.defineProperty(exports, "GoogleLogin", { enumerable: true, get: function () { return google_1.GoogleLogin; } });
const kakao_1 = require("./kakao");
Object.defineProperty(exports, "KakaoLogin", { enumerable: true, get: function () { return kakao_1.KakaoLogin; } });
const naver_1 = require("./naver");
Object.defineProperty(exports, "NaverLogin", { enumerable: true, get: function () { return naver_1.NaverLogin; } });
class SocialLogin {
    constructor() {
        this.KakaoLogin = kakao_1.KakaoLogin;
        this.GoogleLogin = google_1.GoogleLogin;
        this.NaverLogin = naver_1.NaverLogin;
    }
}
exports.SocialLogin = SocialLogin;
//# sourceMappingURL=index.js.map