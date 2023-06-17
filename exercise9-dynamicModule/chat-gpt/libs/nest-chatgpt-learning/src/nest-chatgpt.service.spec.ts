import { Test, TestingModule } from '@nestjs/testing';
import { NestChatgptService } from './nest-chatgpt.service';

describe('NestChatgptService', () => {
  let service: NestChatgptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestChatgptService],
    }).compile();

    service = module.get<NestChatgptService>(NestChatgptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
