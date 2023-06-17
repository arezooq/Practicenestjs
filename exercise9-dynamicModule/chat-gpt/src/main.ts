import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestChatgptModule } from 'libs/nest-chatgpt-learning/src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get('PORT');
  await app.listen(port);
}
bootstrap();
