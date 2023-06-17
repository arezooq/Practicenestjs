import { GetAiModelAnswer } from './model/get-ai-model-answer';
export declare class ChatgptService {
    private openAiApi;
    private selectedModelId;
    setModelId(modelId: string): void;
    cleanModelId(modelId: string): string;
    listModels(): Promise<import("openai").ListModelsResponse>;
    sharedGetModelAnswer(input: GetAiModelAnswer, apiKey: string): Promise<import("openai").CreateCompletionResponse | import("openai").CreateCompletionResponseChoicesInner[]>;
}
