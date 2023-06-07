"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LocationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModule = exports.LOCATION_CONFIG = void 0;
const common_1 = require("@nestjs/common");
const location_1 = require("./location");
exports.LOCATION_CONFIG = Symbol('LOCATION_CONFIG');
let LocationModule = LocationModule_1 = class LocationModule {
    static forRoot(config = {}) {
        const providers = [
            {
                provide: exports.LOCATION_CONFIG,
                useValue: config || null,
            },
        ];
        return {
            module: LocationModule_1,
            providers,
            exports: providers,
        };
    }
};
LocationModule = LocationModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [location_1.Location],
        exports: [location_1.Location],
    })
], LocationModule);
exports.LocationModule = LocationModule;
//# sourceMappingURL=location.module.js.map