import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './typeorm';
// import User from './typeorm/entities/User';
// import { Profile } from './typeorm/entities/Profile';
// import { Post } from './typeorm/entities/Post';
import { UserModule } from './users/modules/user.module';
import { AuthModule } from './auth/modules/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_mysql',
      // entities: [User, Profile, Post],
      entities,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
