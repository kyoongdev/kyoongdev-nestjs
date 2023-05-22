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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = __importDefault(require("crypto-js"));
let Encrypt = class Encrypt {
    constructor({ aes, saltRound }) {
        this.aesKey = aes;
        this.saltRound = saltRound;
    }
    hash(value, saltRound) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.saltRound && !saltRound) {
                return null;
            }
            return yield bcrypt_1.default.hash(value, (this.saltRound || saltRound));
        });
    }
    signAES(value) {
        if (!this.aesKey) {
            return null;
        }
        return crypto_js_1.default.AES.encrypt(value, this.aesKey).toString();
    }
    verifyAES(value) {
        if (!this.aesKey) {
            return null;
        }
        return crypto_js_1.default.AES.decrypt(value, this.aesKey).toString(crypto_js_1.default.enc.Utf8);
    }
};
Encrypt = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], Encrypt);
exports.Encrypt = Encrypt;
//# sourceMappingURL=index.js.map