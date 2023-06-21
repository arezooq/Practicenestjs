import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Logging DELETE request Ip:', req.ip);
    console.log('Logging DELETE request Path:', req.path);
    console.log('Logging DELETE request Headers:', req.headers);
    next();
  }
}
