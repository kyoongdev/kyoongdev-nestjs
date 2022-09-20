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
exports.PaginationDTO = void 0;
const validation_1 = require("utils/validation");
const meta_dto_1 = require("./meta.dto");
class PaginationDTO {
    constructor(data, { paging, count }) {
        this.data = data;
        this.paging = new meta_dto_1.PagingMetaDTO({ paging, count });
    }
}
__decorate([
    (0, validation_1.Property)({ apiProperty: { isArray: true } }),
    __metadata("design:type", Array)
], PaginationDTO.prototype, "data", void 0);
__decorate([
    (0, validation_1.Property)({ apiProperty: { type: meta_dto_1.PagingMetaDTO } }),
    __metadata("design:type", meta_dto_1.PagingMetaDTO)
], PaginationDTO.prototype, "paging", void 0);
exports.PaginationDTO = PaginationDTO;
//# sourceMappingURL=pagination.dto.js.map