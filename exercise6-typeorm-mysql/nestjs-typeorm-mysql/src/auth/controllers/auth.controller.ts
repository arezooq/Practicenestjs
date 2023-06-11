import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard, DiscordAuthGuard } from '../guards';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return;
  }

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.send(200);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status() {
    return 'ok';
  }

  @Get('logout')
  logout() {}
}
