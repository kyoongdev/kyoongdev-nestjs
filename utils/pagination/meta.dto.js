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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingMetaDTO = void 0;
const lodash_1 = require("lodash");
const validation_1 = require("../validation");
class PagingMetaDTO {
    constructor({ paging, count }) {
        this.total = count;
        this.page = (0, lodash_1.isNaN)(Number(paging.page)) ? 1 : Number(paging.page);
        this.limit = (0, lodash_1.isNaN)(Number(paging.limit)) ? 10 : Number(paging.limit);
        this.skip = paging.getSkipTake().skip;
        this.hasPrev = this.page > 1;
        this.hasNext = this.page * this.limit < count;
    }
}
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], PagingMetaDTO.prototype, "total", void 0);
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], PagingMetaDTO.prototype, "page", void 0);
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], PagingMetaDTO.prototype, "limit", void 0);
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], PagingMetaDTO.prototype, "skip", void 0);
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], PagingMetaDTO.prototype, "hasPrev", void 0);
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], PagingMetaDTO.prototype, "hasNext", void 0);
exports.PagingMetaDTO = PagingMetaDTO;
//# sourceMappingURL=meta.dto.js.map