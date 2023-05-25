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
var AppleLogin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleLogin = void 0;
const apple_auth_1 = __importDefault(require("apple-auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@nestjs/common");
let AppleLogin = AppleLogin_1 = class AppleLogin {
    constructor(props) {
        this.appleAuth = new apple_auth_1.default(props.appleConfig, props.path, 'text');
    }
    getRest(res) {
        res.redirect(this.appleAuth.loginURL());
    }
    static getUser(id_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idToken = jsonwebtoken_1.default.decode(id_token);
                if (!(idToken === null || idToken === void 0 ? void 0 : idToken.sub))
                    return undefined;
                return {
                    id: idToken.sub,
                    email: idToken.email,
                };
            }
            catch (error) {
                return undefined;
            }
        });
    }
    getRestCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield AppleLogin_1.getUser(code);
                if (!user)
                    throw { status: 500, message: '애플 유저 정보 발급 오류!' };
                return user;
            }
            catch (err) {
                return undefined;
            }
        });
    }
};
AppleLogin = AppleLogin_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], AppleLogin);
exports.AppleLogin = AppleLogin;
//# sourceMappingURL=apple.js.map