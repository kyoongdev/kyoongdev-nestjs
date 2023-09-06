"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SocialLocationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLocationModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const location_1 = require("./location");
let SocialLocationModule = SocialLocationModule_1 = class SocialLocationModule {
    static forRoot(config = {}) {
        const providers = [
            {
                provide: constants_1.LOCATION_CONFIG,
                useValue: config,
            },
        ];
        return {
            module: SocialLocationModule_1,
            providers,
            exports: providers,
        };
    }
};
SocialLocationModule = SocialLocationModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [location_1.SocialLocationService],
        exports: [location_1.SocialLocationService],
    })
], SocialLocationModule);
exports.SocialLocationModule = SocialLocationModule;
//# sourceMappingURL=location.module.js.map