import { Provider } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { prefixesForLoggers } from './logger.decorator';

function loggerFactory(logger: LoggerService, prefix: string) {
  if (prefix) {
    logger.setPrefix(prefix);
  }
  return logger;
}

function createLoggerProvider(prefix: string): Provider<LoggerService> {
  return {
    provide: `LoggerService${prefix}`,
    useFactory: (logger) => loggerFactory(logger, prefix),
    inject: [LoggerService],
  };
}

export function createLoggerProviders(): Array<Provider<LoggerService>> {
  return prefixesForLoggers.map((prefix) => createLoggerProvider(prefix));
}
