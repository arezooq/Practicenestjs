"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestChatgptModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestChatgptModule = void 0;
const common_1 = require("@nestjs/common");
const nest_chatgpt_service_1 = require("./nest-chatgpt.service");
const nest_chatgpt_request_scope_service_1 = require("./nest-chatgpt-request-scope.service");
const consts_1 = require("./consts");
let NestChatgptModule = exports.NestChatgptModule = NestChatgptModule_1 = class NestChatgptModule {
    static register(apikey) {
        return {
            module: NestChatgptModule_1,
            providers: [
                {
                    provide: consts_1.CHATGPT_APIKEY,
                    useValue: apikey,
                },
                nest_chatgpt_service_1.NestChatgptService,
                nest_chatgpt_request_scope_service_1.NestChatgptRequestScopeService,
            ],
            exports: [nest_chatgpt_service_1.NestChatgptService, nest_chatgpt_request_scope_service_1.NestChatgptRequestScopeService],
        };
    }
};
exports.NestChatgptModule = NestChatgptModule = NestChatgptModule_1 = __decorate([
    (0, common_1.Module)({})
], NestChatgptModule);
//# sourceMappingURL=nest-chatgpt.module.js.map