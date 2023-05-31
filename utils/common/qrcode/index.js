"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.QrCode = void 0;
const common_1 = require("@nestjs/common");
const form_data_1 = __importDefault(require("form-data"));
const qrcode_1 = __importDefault(require("qrcode"));
let QrCode = class QrCode {
    createQRCodeData(props) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qrCode = yield qrcode_1.default.toDataURL(props.target, {
                    errorCorrectionLevel: 'H',
                    type: 'image/png',
                });
                const base64Data = Buffer.from(qrCode.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const formData = new form_data_1.default();
                formData.append('file', base64Data, (_a = props.fileName) !== null && _a !== void 0 ? _a : 'qrCode.png');
                return {
                    qrFormData: formData,
                    base64: base64Data,
                };
            }
            catch (err) {
                return undefined;
            }
        });
    }
    createQrCodesData(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = { success: [], failure: [] };
            for (const prop of props) {
                const qrCode = yield this.createQRCodeData(prop);
                if (qrCode) {
                    result.success.push(qrCode);
                }
                else {
                    result.failure.push(prop);
                }
            }
            return result;
        });
    }
};
QrCode = __decorate([
    (0, common_1.Injectable)()
], QrCode);
exports.QrCode = QrCode;
//# sourceMappingURL=index.js.map