"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.ApiFile = exports.ResponseApi = exports.RequestApi = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const constants_1 = require("./constants");
const helper_1 = require("./helper");
const RequestApi = (swaggerOptions) => {
    const { headers, params, query, body } = swaggerOptions;
    const paramDecorators = [];
    if (headers)
        paramDecorators.push(...(Array.isArray(headers) ? headers.map(helper_1.createHeader) : [(0, helper_1.createHeader)(headers)]));
    if (params)
        paramDecorators.push(...(Array.isArray(params) ? params.map(helper_1.createParam) : [(0, helper_1.createParam)(params)]));
    if (query)
        paramDecorators.push(...(Array.isArray(query) ? query.map(helper_1.createQuery) : [(0, helper_1.createQuery)(query)]));
    if (body)
        paramDecorators.push(...(Array.isArray(body) ? body.map(helper_1.createBody) : [(0, helper_1.createBody)(body)]));
    return (target, key, descriptor) => {
        for (const { metadata, initial } of paramDecorators) {
            if (descriptor) {
                const parameters = Reflect.getMetadata(constants_1.DECORATORS.API_PARAMETERS, descriptor.value) || [];
                Reflect.defineMetadata(constants_1.DECORATORS.API_PARAMETERS, [
                    ...parameters,
                    Object.assign(Object.assign({}, initial), (0, lodash_1.pickBy)(metadata, (0, lodash_1.negate)(lodash_1.isUndefined))),
                ], descriptor.value);
            }
        }
        return descriptor;
    };
};
exports.RequestApi = RequestApi;
const ResponseApi = (options, code = 200) => {
    const [type, isArray] = (0, helper_1.getTypeIsArrayTuple)(options.type, options.isArray);
    if (options.isPaging && !!type) {
        options.type = type;
        options.isArray = isArray;
        options.description = options.description ? options.description : '';
        const groupedMetadata = {
            [options.status || 'default']: (0, lodash_1.omit)(options, 'status'),
        };
        return (target, key, descriptor) => {
            if (descriptor) {
                const responses = Reflect.getMetadata(constants_1.DECORATORS.API_RESPONSE, descriptor.value) || {};
                Reflect.defineMetadata(constants_1.DECORATORS.API_RESPONSE, Object.assign(Object.assign({}, responses), groupedMetadata), descriptor.value);
                (0, swagger_1.ApiExtraModels)(type)(target, key, descriptor);
                return (0, exports.ResponseApi)({
                    schema: {
                        properties: {
                            paging: {
                                type: 'object',
                                properties: {
                                    total: {
                                        type: 'number',
                                    },
                                    page: {
                                        type: 'number',
                                    },
                                    limit: {
                                        type: 'number',
                                    },
                                    skip: {
                                        type: 'number',
                                    },
                                    hasPrev: {
                                        type: 'boolean',
                                    },
                                    hasNext: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            data: {
                                type: 'array',
                                items: { $ref: (0, swagger_1.getSchemaPath)(type) },
                            },
                        },
                    },
                })(target, key, descriptor);
            }
        };
    }
    return (target, key, descriptor) => {
        if (descriptor) {
            (0, common_1.HttpCode)(code)(target, key, descriptor);
            (0, swagger_1.ApiResponse)(options)(target, key, descriptor);
        }
    };
};
exports.ResponseApi = ResponseApi;
const ApiFile = (fieldName = 'file') => {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(fieldName)), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                [fieldName]: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }));
};
exports.ApiFile = ApiFile;
const Auth = (guard, name = 'access-token') => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(name), (0, common_1.UseGuards)(guard));
};
exports.Auth = Auth;
//# sourceMappingURL=decorator.js.map