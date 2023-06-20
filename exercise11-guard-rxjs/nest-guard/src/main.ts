import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { validationExceptionFilter } from './filters/validation-exception.filter';
import { ValidationsPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new validationExceptionFilter());
  app.useGlobalPipes(new ValidationsPipe());
  await app.listen(3000);
}
bootstrap();
