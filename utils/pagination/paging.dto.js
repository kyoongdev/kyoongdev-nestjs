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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PagingDTO_skip, _PagingDTO_take;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingDTO = void 0;
const validation_1 = require("../validation");
class PagingDTO {
    constructor() {
        _PagingDTO_skip.set(this, void 0);
        _PagingDTO_take.set(this, void 0);
    }
    set(page, limit) {
        this.page = page;
        this.limit = limit;
    }
    getSkipTake() {
        __classPrivateFieldSet(this, _PagingDTO_take, Number(this.limit) || 20, "f");
        __classPrivateFieldSet(this, _PagingDTO_skip, (Number(this.page) - 1) * __classPrivateFieldGet(this, _PagingDTO_take, "f"), "f");
        return { skip: __classPrivateFieldGet(this, _PagingDTO_skip, "f"), take: __classPrivateFieldGet(this, _PagingDTO_take, "f") };
    }
}
_PagingDTO_skip = new WeakMap(), _PagingDTO_take = new WeakMap();
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'number', minimum: 1, default: 1 } }),
    __metadata("design:type", Number)
], PagingDTO.prototype, "page", void 0);
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'number', minimum: 20, default: 20 } }),
    __metadata("design:type", Number)
], PagingDTO.prototype, "limit", void 0);
exports.PagingDTO = PagingDTO;
//# sourceMappingURL=paging.dto.js.map