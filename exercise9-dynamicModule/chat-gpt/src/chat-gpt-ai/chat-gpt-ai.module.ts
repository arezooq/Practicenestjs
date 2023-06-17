import { Module } from '@nestjs/common';
import { ChatGptAiController } from './chat-gpt-ai.controller';
import { NestChatgptModule } from '@arezooq/nest-chatgpt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    NestChatgptModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => {
        return configService.get('CHATGPT_APIKEY');
      },
    }),
  ],
  controllers: [ChatGptAiController],
})
export class ChatGptAiModule {}
