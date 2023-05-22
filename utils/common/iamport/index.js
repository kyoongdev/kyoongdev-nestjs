"use strict";
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
exports.Iamport = void 0;
const axios_1 = __importDefault(require("axios"));
const view_1 = require("./view");
const api = axios_1.default.create({
    baseURL: 'https://api.iamport.kr',
});
class Iamport {
    constructor({ imp_key, imp_secret, merchant_id, pg }) {
        this.imp_key = imp_key;
        this.imp_secret = imp_secret;
        this.merchant_id = merchant_id;
        this.pg = pg;
    }
    getToken({ imp_key, imp_secret }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!imp_key && !imp_secret && !this.imp_key && !this.imp_secret) {
                throw 'Invalid Key';
            }
            const data = {
                imp_key: imp_key || this.imp_key,
                imp_secret: imp_secret || this.imp_secret,
            };
            const headers = { 'Content-Type': 'application/json' };
            try {
                const response = yield api.post('/users/getToken', data, { headers });
                const { access_token } = response.data.response;
                return access_token;
            }
            catch (error) {
                return null;
            }
        });
    }
    getPaymentData({ access_token, imp_uid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = { Authorization: access_token };
            try {
                const response = yield api.get(`/payments/${imp_uid}`, { headers });
                const data = response.data.response;
                return data;
            }
            catch (error) {
                return null;
            }
        });
    }
    getPaymentHTML(props) {
        var _a;
        if (!this.merchant_id && !props.merchant_id) {
            return null;
        }
        if (!this.pg && !props.pg) {
            return null;
        }
        return (0, view_1.getRequestPaymentHTML)(Object.assign(Object.assign({}, props), { title: props.title || '결제하기', merchant_id: (_a = props.merchant_id) !== null && _a !== void 0 ? _a : this.merchant_id, pg: props.pg || this.pg }));
    }
    getPaymentDataWithAccessToken({ imp_key, imp_secret, imp_uid, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const access_token = yield this.getToken({ imp_key, imp_secret });
                if (!access_token) {
                    throw 'Invalid AccessToken';
                }
                const data = yield this.getPaymentData({ access_token, imp_uid });
                if (!data) {
                    throw 'Invalid Payment Data';
                }
                return Object.assign(Object.assign({}, data), { access_token });
            }
            catch (error) {
                return error;
            }
        });
    }
    completePayment({ imp_key, imp_secret, imp_uid, productAmount, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentData = yield this.getPaymentDataWithAccessToken({
                imp_key,
                imp_secret,
                imp_uid,
            });
            if (typeof paymentData === 'string') {
                throw { status: 400, message: '결제 정보를 불러올 수 없습니다' };
            }
            if (typeof productAmount === 'string') {
                productAmount = Number(productAmount);
            }
            const { amount, status } = paymentData;
            if (Number(amount) === productAmount) {
                switch (status) {
                    case 'ready':
                        const { vbank_num, vbank_date, vbank_name } = paymentData;
                        return {
                            status: 200,
                            message: '가상계좌 발급 성공',
                            completeStatus: status,
                            data: { vbank_num, vbank_date, vbank_name },
                        };
                    case 'paid':
                        return {
                            status: 200,
                            message: '일반 결제 성공',
                            completeStatus: status,
                            data: { amount, productAmount },
                        };
                    default:
                        throw { status: 400, message: '결제 실패' };
                }
            }
            else {
                throw { status: 400, message: '위조된 결제시도' };
            }
        });
    }
    cancelPayment({ imp_key, imp_secret, imp_uid, reason, cancelAmount, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentData = yield this.getPaymentDataWithAccessToken({
                imp_key,
                imp_secret,
                imp_uid,
            });
            if (typeof paymentData === 'string') {
                throw { status: 400, message: '결제 정보를 불러올 수 없습니다' };
            }
            if (typeof cancelAmount === 'string') {
                cancelAmount = Number(cancelAmount);
            }
            const { amount, cancel_amount } = paymentData;
            const cancelAbleAmount = amount - cancel_amount;
            if (cancelAbleAmount <= 0) {
                return null;
            }
            const data = {
                reason: reason || '',
                imp_uid,
                amount: cancelAmount,
                checksum: cancelAbleAmount,
            };
            const headers = {
                'Content-Type': 'application/json',
                Authorization: paymentData.access_token,
            };
            const response = yield api.post('/payments/cancel', data, { headers });
            return response.data.response;
        });
    }
    getCeritifcationHTMLData(props) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.merchant_id && !props.merchant_uid)
                return null;
            return (0, view_1.getCertificationHTML)(Object.assign(Object.assign({}, props), { imp_uid: props.imp_uid, merchant_uid: (_a = props.merchant_uid) !== null && _a !== void 0 ? _a : this.merchant_id }));
        });
    }
    getCertificationData({ access_token, imp_uid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = { Authorization: access_token };
            try {
                const response = yield api.get(`/certifications/${imp_uid}`, { headers });
                const data = response.data.response;
                return data;
            }
            catch (error) {
                return null;
            }
        });
    }
    getCeritificationDataWithAccessToken({ imp_key, imp_secret, imp_uid, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const access_token = yield this.getToken({ imp_key, imp_secret });
                if (!access_token) {
                    throw { status: 403, message: 'Invalid AccessToken' };
                }
                const data = yield this.getCertificationData({ access_token, imp_uid });
                if (!data) {
                    throw { status: 403, message: 'Invalid Payment Data' };
                }
                return Object.assign(Object.assign({}, data), { access_token });
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.Iamport = Iamport;
//# sourceMappingURL=index.js.map