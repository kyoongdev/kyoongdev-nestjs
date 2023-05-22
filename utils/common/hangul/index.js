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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hangul = void 0;
const common_1 = require("@nestjs/common");
const HangulJS = __importStar(require("hangul-js"));
let Hangul = class Hangul {
    constructor() {
        this.korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        this.isKorean = (target) => {
            return this.korean.test(target);
        };
        this.hangulSearch = (target, text) => {
            target = target.toUpperCase();
            text = text.toUpperCase();
            for (let i = 0; i < text.length; i++) {
                if (HangulJS.isJong(text[i])) {
                    text = text.slice(0, i) + HangulJS.d(text[i]).join('') + text.slice(i + 1);
                }
            }
            const dTarget = HangulJS.d(target, true);
            const dText = HangulJS.d(text, true);
            const choTarget = dTarget.map((el) => el[0]).join('');
            const choText = dText.map((el) => el[0]).join('');
            let correctIdx = choTarget.indexOf(choText);
            let check = false;
            while (correctIdx >= 0) {
                check = true;
                for (let charIdx = 0; charIdx < dText.length; charIdx++) {
                    const dTargetIdx = charIdx + correctIdx;
                    for (let dIdx = 0; dIdx < dText[charIdx].length; dIdx++) {
                        if (dTarget[dTargetIdx][dIdx] !== dText[charIdx][dIdx]) {
                            check = false;
                            if (dIdx === dText[charIdx].length - 1 &&
                                HangulJS.isCho(dText[charIdx][dIdx]) &&
                                dTarget[dTargetIdx + 1] &&
                                dTarget[dTargetIdx + 1][0] === dText[charIdx][dIdx])
                                check = true;
                            break;
                        }
                    }
                    if (check === false) {
                        correctIdx = choTarget.indexOf(choText, correctIdx + 1);
                        break;
                    }
                }
                if (check)
                    break;
            }
            return check;
        };
        this.getChosungSearchedData = (target, data, keyword) => {
            return data.filter((value) => this.hangulSearch(value[`${target}`], keyword));
        };
    }
};
Hangul = __decorate([
    (0, common_1.Injectable)()
], Hangul);
exports.Hangul = Hangul;
//# sourceMappingURL=index.js.map