import { Inject, Injectable } from '@nestjs/common';
import { GetAiModelAnswer } from './model/get-ai-model-answer';
import { ChatgptService } from './chatgpt.service';
import { CHATGPT_APIKEY } from './consts';

@Injectable()
export class NestChatgptService extends ChatgptService {
  constructor(
    @Inject(CHATGPT_APIKEY)
    private apiKey: string,
  ) {
    super();
  }

  async getModelAnswer(input: GetAiModelAnswer) {
    return this.sharedGetModelAnswer(input, this.apiKey);
  }
}
