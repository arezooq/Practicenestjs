import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { DiscordStrategy } from '../strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../typeorm';
import { SessionSerializer } from 'src/utils/Serializer';

@Module({
  controllers: [AuthController],
  providers: [
    DiscordStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
