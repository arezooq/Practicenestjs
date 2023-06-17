import { Request } from 'express';
import { ChatgptService } from './chatgpt.service';
import { GetAiModelAnswer } from './model/get-ai-model-answer';
export declare class NestChatgptRequestScopeService extends ChatgptService {
    private req;
    constructor(req: Request);
    getModelAnswer(input: GetAiModelAnswer): Promise<import("openai").CreateCompletionResponse | import("openai").CreateCompletionResponseChoicesInner[]>;
}
