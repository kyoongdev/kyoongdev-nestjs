"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paging = void 0;
const common_1 = require("@nestjs/common");
const pagination_1 = require("../pagination");
exports.Paging = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { page, limit } = request.query;
    return new pagination_1.PagingDTO(page !== null && page !== void 0 ? page : 0, limit !== null && limit !== void 0 ? limit : 20);
});
//# sourceMappingURL=paging.decorators.js.map