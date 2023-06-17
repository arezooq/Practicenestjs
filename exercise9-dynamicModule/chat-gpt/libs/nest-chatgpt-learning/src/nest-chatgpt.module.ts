import {
  DynamicModule,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
} from '@nestjs/common';
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

  static registerAsync(options: {
    imports: any[];
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useFactory: (...args: any[]) => string | Promise<string>;
  }): DynamicModule {
    return {
      module: NestChatgptModule,
      imports: options.imports,
      providers: [
        {
          provide: CHATGPT_APIKEY,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        NestChatgptService,
        NestChatgptRequestScopeService,
      ],
      exports: [NestChatgptService, NestChatgptRequestScopeService],
    };
  }
}
