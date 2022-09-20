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
exports.PagingDTO = void 0;
const validation_1 = require("utils/validation");
class PagingDTO {
    constructor(page, limit) {
        this.page = page;
        this.limit = limit;
    }
    getSkipTake() {
        const take = Number(this.limit) || 20;
        const skip = (Number(this.page) - 1) * take;
        return { skip, take };
    }
}
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