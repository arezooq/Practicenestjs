import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NestChatgptService } from '@arezooq/nest-chatgpt';
import { GetAiModelAnswer } from './model/get-ai-model-answer';
import { SetSelectedModel } from './model/set-selected-model';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly chatService: NestChatgptService) {}

  @Post('/message')
  @UsePipes(ValidationPipe)
  getModelAnswer(@Body() data: GetAiModelAnswer) {
    return this.chatService.getModelAnswer(data);
  }

  @Get('/model')
  listModel() {
    return this.chatService.listModels();
  }

  @Post('/model')
  @UsePipes(ValidationPipe)
  setModel(@Body() data: SetSelectedModel) {
    this.chatService.setModelId(data.modelId);
  }
}
