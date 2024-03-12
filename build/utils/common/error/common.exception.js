"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonException = void 0;
const common_1 = require("@nestjs/common");
class CommonException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.CommonException = CommonException;
//# sourceMappingURL=common.exception.js.map