"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatgptService = void 0;
const openai_1 = require("openai");
const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;
const DEFAULT_MAX_TOKENS = 2040;
class ChatgptService {
    setModelId(modelId) {
        this.selectedModelId = this.cleanModelId(modelId);
    }
    cleanModelId(modelId) {
        if (modelId.includes(':')) {
            modelId = modelId.replace(':', '-');
        }
        return modelId;
    }
    async listModels() {
        const models = await this.openAiApi.listModels();
        return models.data;
    }
    async sharedGetModelAnswer(input, apiKey) {
        try {
            const configuration = new openai_1.Configuration({
                apiKey,
            });
            this.openAiApi = new openai_1.OpenAIApi(configuration);
            const { question, temperature, modelId, maxTokens } = input;
            let model = DEFAULT_MODEL_ID;
            if (modelId) {
                model = modelId;
            }
            else if (this.selectedModelId) {
                model = this.selectedModelId;
            }
            const params = {
                prompt: question,
                model: this.cleanModelId(model),
                temperature: temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
                max_tokens: maxTokens ? maxTokens : DEFAULT_MAX_TOKENS,
            };
            const response = await this.openAiApi.createCompletion(params);
            const { data } = response;
            if (data.choices.length) {
                return data.choices;
            }
            return response.data;
        }
        catch (error) {
            console.log('error', error);
        }
    }
}
exports.ChatgptService = ChatgptService;
//# sourceMappingURL=chatgpt.service.js.map