"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const swagger_1 = require("../swagger");
const property_utils_1 = require("./property-utils");
const Property = ({ apiProperty = {}, validation, overrideExisting, typeOptions = {} }) => {
    var _a;
    const [type, isArray] = (0, swagger_1.getTypeIsArrayTuple)(apiProperty.type, (_a = apiProperty.isArray) !== null && _a !== void 0 ? _a : false);
    apiProperty = Object.assign(Object.assign({}, apiProperty), { type,
        isArray });
    if (apiProperty.nullable && typeof apiProperty.type === 'string') {
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
    if (Array.isArray(apiProperty.type)) {
        apiProperty.type = 'array';
        apiProperty.items = {
            type: 'array',
            items: {
                type: apiProperty.type[0],
            },
        };
    }
    return (0, property_utils_1.createPropertyDecorator)(swagger_1.DECORATORS.API_MODEL_PROPERTIES, apiProperty, overrideExisting, typeOptions, validation);
};
exports.Property = Property;
//# sourceMappingURL=property.js.map