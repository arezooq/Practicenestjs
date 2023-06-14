import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { logger } from './logger/logger.decorator';

@Injectable()
export class AppService {
  constructor(@logger('AppService') private logger: LoggerService) {
    // this.logger.setPrefix('AppService');
  }
  getHello(): string {
    this.logger.log('Hello There');
    return 'Hello World!';
  }
}
