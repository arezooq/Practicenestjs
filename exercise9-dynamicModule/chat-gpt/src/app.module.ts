import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ChatGptAiModule, ConfigModule.forRoot(), LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PORT',
      useValue: 3000,
    },
  ],
})
export class AppModule {}
