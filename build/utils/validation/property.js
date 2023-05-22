"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = exports.ToBoolean = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("../swagger");
const property_utils_1 = require("./property-utils");
const ToBoolean = () => {
    const toPlain = (0, class_transformer_1.Transform)(({ value }) => {
        return value;
    }, {
        toPlainOnly: true,
    });
    const toClass = (target, key) => {
        return (0, class_transformer_1.Transform)(({ obj }) => {
            return valueToBoolean(obj[key]);
        }, {
            toClassOnly: true,
        })(target, key);
    };
    return function (target, key) {
        toPlain(target, key);
        toClass(target, key);
    };
};
exports.ToBoolean = ToBoolean;
const valueToBoolean = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
        return true;
    }
    if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
        return false;
    }
    return value;
};
const Property = ({ apiProperty = {}, validation, overrideExisting, typeOptions = {} }) => {
    var _a;
    const [type, isArray] = (0, swagger_1.getTypeIsArrayTuple)(apiProperty.type, (_a = apiProperty.isArray) !== null && _a !== void 0 ? _a : false);
    apiProperty = Object.assign(Object.assign({}, apiProperty), { type,
        isArray });
    if (apiProperty.nullable && typeof apiProperty.type === 'string' && !apiProperty.example && !apiProperty.isArray) {
        apiProperty.example = `${apiProperty.type} | null`;
    }
    apiProperty.required = !apiProperty.nullable;
    if ((0, swagger_1.isEnumArray)(apiProperty)) {
        apiProperty.type = 'array';
        const enumValues = (0, swagger_1.getEnumValues)(apiProperty.enum);
        apiProperty.items = {
            type: (0, swagger_1.getEnumType)(enumValues),
            enum: enumValues,
        };
        delete apiProperty.enum;
    }
    else if (apiProperty.enum) {
        const enumValues = (0, swagger_1.getEnumValues)(apiProperty.enum);
        apiProperty.enum = enumValues;
        apiProperty.type = (0, swagger_1.getEnumType)(enumValues);
    }
    if ((Array.isArray(apiProperty.type) || isArray) && typeof apiProperty.type === 'string') {
        apiProperty.example = apiProperty.example
            ? apiProperty.example
            : `${apiProperty.type}[] ${apiProperty.nullable ? '| null' : ''}`;
    }
    return (0, property_utils_1.createPropertyDecorator)(swagger_1.DECORATORS.API_MODEL_PROPERTIES, apiProperty, overrideExisting, typeOptions, validation);
};
exports.Property = Property;
//# sourceMappingURL=property.js.map