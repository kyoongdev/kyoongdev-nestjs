"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBody = exports.createQuery = exports.createHeader = exports.createParam = exports.getTypeIsArrayTuple = void 0;
const lodash_1 = require("lodash");
const decorator_type_1 = require("./decorator-type");
const enum_utils_1 = require("./enum-utils");
function getTypeIsArrayTuple(input, isArrayFlag) {
    if (!input) {
        return [input, isArrayFlag !== null && isArrayFlag !== void 0 ? isArrayFlag : false];
    }
    if (isArrayFlag) {
        return [input, isArrayFlag];
    }
    const isInputArray = (0, lodash_1.isArray)(input);
    const type = isInputArray ? input[0] : input;
    return [type, isInputArray];
}
exports.getTypeIsArrayTuple = getTypeIsArrayTuple;
const createParam = (params) => {
    const param = Object.assign({ in: 'path' }, (0, lodash_1.omit)(params, 'enum'));
    const apiParamMetadata = params;
    if (apiParamMetadata.enum) {
        param.schema = param.schema || {};
        const paramSchema = param.schema;
        const enumValues = (0, enum_utils_1.getEnumValues)(apiParamMetadata.enum);
        paramSchema.type = (0, enum_utils_1.getEnumType)(enumValues);
        paramSchema.enum = enumValues;
        if (apiParamMetadata.enumName) {
            param.enumName = apiParamMetadata.enumName;
        }
    }
    return {
        metadata: param,
        initial: decorator_type_1.defaultParamOptions,
    };
};
exports.createParam = createParam;
const createHeader = (headers) => {
    const param = (0, lodash_1.pickBy)({
        name: (0, lodash_1.isNil)(headers.name) ? decorator_type_1.defaultHeaderOptions.name : headers.name,
        in: 'header',
        description: headers.description,
        required: headers.required,
        schema: Object.assign(Object.assign({}, (headers.schema || {})), { type: 'string' }),
    }, (0, lodash_1.negate)(lodash_1.isUndefined));
    if (headers.enum) {
        const enumValues = (0, enum_utils_1.getEnumValues)(headers.enum);
        param.schema = {
            enum: enumValues,
            type: (0, enum_utils_1.getEnumType)(enumValues),
        };
    }
    return {
        metadata: param,
        initial: (0, lodash_1.pickBy)(headers, (0, lodash_1.negate)(lodash_1.isUndefined)),
    };
};
exports.createHeader = createHeader;
const createQuery = (query) => {
    const apiQueryMetadata = query;
    const [type, isArray] = getTypeIsArrayTuple(apiQueryMetadata.type, apiQueryMetadata.isArray);
    const param = Object.assign(Object.assign({ name: (0, lodash_1.isNil)(query.name) ? decorator_type_1.defaultQueryOptions.name : query.name, in: 'query' }, (0, lodash_1.omit)(query, 'enum')), { type });
    if ((0, enum_utils_1.isEnumArray)(query)) {
        (0, enum_utils_1.addEnumArraySchema)(param, query);
    }
    else if ((0, enum_utils_1.isEnumDefined)(query)) {
        (0, enum_utils_1.addEnumSchema)(param, query);
    }
    if (!query.required) {
        param.required = false;
    }
    if (isArray) {
        param.isArray = isArray;
    }
    return {
        metadata: param,
        initial: decorator_type_1.defaultQueryOptions,
    };
};
exports.createQuery = createQuery;
const createBody = (body) => {
    const [type, isArray] = getTypeIsArrayTuple(body.type, body.isArray);
    const param = Object.assign(Object.assign({ in: 'body' }, (0, lodash_1.omit)(body, 'enum')), { type,
        isArray });
    if ((0, enum_utils_1.isEnumArray)(body)) {
        (0, enum_utils_1.addEnumArraySchema)(param, body);
    }
    else if ((0, enum_utils_1.isEnumDefined)(body)) {
        (0, enum_utils_1.addEnumSchema)(param, body);
    }
    return {
        metadata: param,
        initial: decorator_type_1.defaultBodyMetadata,
    };
};
exports.createBody = createBody;
//# sourceMappingURL=helper.js.map