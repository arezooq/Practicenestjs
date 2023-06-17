import { GetAiModelAnswer } from './model/get-ai-model-answer';
import { ChatgptService } from './chatgpt.service';
export declare class NestChatgptService extends ChatgptService {
    private apiKey;
    constructor(apiKey: string);
    getModelAnswer(input: GetAiModelAnswer): Promise<import("openai").CreateCompletionResponse | import("openai").CreateCompletionResponseChoicesInner[]>;
}
