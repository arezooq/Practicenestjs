import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { validationExceptionFilter } from './filters/validation-exception.filter';
import { ValidationsPipe } from './pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('Product api')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/products', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new validationExceptionFilter());
  app.useGlobalPipes(new ValidationsPipe());
  await app.listen(3000);
}
bootstrap();
