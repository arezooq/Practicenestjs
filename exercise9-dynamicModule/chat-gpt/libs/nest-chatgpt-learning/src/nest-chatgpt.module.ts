import { DynamicModule, Module } from '@nestjs/common';
import { NestChatgptService } from './nest-chatgpt.service';
import { NestChatgptRequestScopeService } from './nest-chatgpt-request-scope.service';
import { CHATGPT_APIKEY } from './consts';

@Module({})
export class NestChatgptModule {
  static register(apikey: string): DynamicModule {
    return {
      module: NestChatgptModule,
      providers: [
        {
          provide: CHATGPT_APIKEY,
          useValue: apikey,
        },
        NestChatgptService,
        NestChatgptRequestScopeService,
      ],
      exports: [NestChatgptService, NestChatgptRequestScopeService],
    };
  }
}
