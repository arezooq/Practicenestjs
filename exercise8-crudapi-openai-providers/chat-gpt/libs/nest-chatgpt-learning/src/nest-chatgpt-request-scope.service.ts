import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ChatgptService } from './chatgpt.service';
import { GetAiModelAnswer } from './model/get-ai-model-answer';

const ApiKeyHeader = 'x-api-key';

@Injectable({
  scope: Scope.REQUEST,
})
export class NestChatgptRequestScopeService extends ChatgptService {
  constructor(
    @Inject(REQUEST)
    private req: Request,
  ) {
    super();
  }

  getModelAnswer(input: GetAiModelAnswer) {
    return this.sharedGetModelAnswer(
      input,
      this.req.headers[ApiKeyHeader] as string,
    );
  }
}
