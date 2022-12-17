"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.ValidateApiProperty = exports.ValidateByOption = exports.ValidateOption = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ValidateOption = (options, typeOptions = {}, apiProperty, validationOptions) => {
    return function (object, propertyName) {
        if ((validationOptions === null || validationOptions === void 0 ? void 0 : validationOptions.each) && apiProperty.type && typeof apiProperty.type === 'function') {
            (0, class_transformer_1.Type)(() => apiProperty.type, typeOptions)(object, propertyName);
            (0, class_validator_1.ValidateNested)(validationOptions)(object, propertyName);
        }
        if (apiProperty.nullable) {
            (0, class_validator_1.IsOptional)(validationOptions)(object, propertyName);
        }
        (0, class_validator_1.registerDecorator)({
            name: options.name,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: options.constraints,
            validator: options.validator,
        });
    };
};
exports.ValidateOption = ValidateOption;
const ValidateByOption = ({ name, validate, defaultMessage }) => ({
    name,
    validator: {
        validate,
        defaultMessage,
    },
});
exports.ValidateByOption = ValidateByOption;
const ValidateApiProperty = ({ apiProperty, validation }) => {
    let validateByOptions = null;
    if (apiProperty.isArray) {
        validateByOptions = (0, exports.ValidateByOption)({
            name: class_validator_1.IS_ARRAY,
            validate: (value, args) => (0, class_validator_1.isArray)(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be an array', validation),
        });
    }
    else if (typeof apiProperty.type === 'function') {
        validateByOptions = (0, exports.ValidateByOption)({
            name: class_validator_1.IS_OBJECT,
            validate: (value, args) => (0, class_validator_1.isObject)(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be an object', validation),
        });
    }
    else if (apiProperty.type === 'number') {
        validateByOptions = (0, exports.ValidateByOption)({
            name: class_validator_1.IS_NUMBER,
            validate: (value, args) => { var _a; return (0, class_validator_1.isNumber)(value, (_a = args === null || args === void 0 ? void 0 : args.constraints) === null || _a === void 0 ? void 0 : _a[0]); },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a number conforming to the specified constraints', validation),
        });
    }
    else if (apiProperty.type === 'boolean') {
        validateByOptions = (0, exports.ValidateByOption)({
            name: class_validator_1.IS_BOOLEAN,
            validate: (value, args) => (0, class_validator_1.isBoolean)(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a boolean value', validation),
        });
    }
    else if (apiProperty.type === 'date') {
        validateByOptions = (0, exports.ValidateByOption)({
            name: class_validator_1.IS_DATE,
            validate: (value, args) => (0, class_validator_1.isDate)(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a Date instance', validation),
        });
    }
    else if (apiProperty.type === 'enum' && apiProperty.enum) {
        validateByOptions = (0, exports.ValidateByOption)({
            name: class_validator_1.IS_ENUM,
            constraints: [apiProperty.enum],
            validate: (value, args) => { var _a; return (0, class_validator_1.isEnum)(value, (_a = args === null || args === void 0 ? void 0 : args.constraints) === null || _a === void 0 ? void 0 : _a[0]); },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a valid enum value', validation),
        });
    }
    else {
        validateByOptions = (0, exports.ValidateByOption)({
            name: class_validator_1.IS_STRING,
            validate: (value, args) => (0, class_validator_1.isString)(value),
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be a string', validation),
        });
    }
    if (apiProperty.nullable) {
        validateByOptions.constraints = validateByOptions.constraints
            ? [...validateByOptions.constraints, (object, value) => value !== null]
            : [(object, value) => value !== null];
    }
    return validateByOptions;
};
exports.ValidateApiProperty = ValidateApiProperty;
const Validate = ({ apiProperty, validation, typeOptions }) => (0, exports.ValidateOption)((0, exports.ValidateApiProperty)({ apiProperty, validation }), typeOptions, apiProperty, validation);
exports.Validate = Validate;
//# sourceMappingURL=validate-utils.js.map