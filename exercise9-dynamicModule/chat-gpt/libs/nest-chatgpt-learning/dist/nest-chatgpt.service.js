"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestChatgptService = void 0;
const common_1 = require("@nestjs/common");
const chatgpt_service_1 = require("./chatgpt.service");
const consts_1 = require("./consts");
let NestChatgptService = exports.NestChatgptService = class NestChatgptService extends chatgpt_service_1.ChatgptService {
    constructor(apiKey) {
        super();
        this.apiKey = apiKey;
    }
    async getModelAnswer(input) {
        return this.sharedGetModelAnswer(input, this.apiKey);
    }
};
exports.NestChatgptService = NestChatgptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(consts_1.CHATGPT_APIKEY)),
    __metadata("design:paramtypes", [String])
], NestChatgptService);
//# sourceMappingURL=nest-chatgpt.service.js.map