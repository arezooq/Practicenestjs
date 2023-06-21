import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './users/roles.guard';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/products'),
    MongooseModule.forRoot('mongodb://127.0.0.1/users'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
