import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/role.enum';
import { User } from './enums/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    // const { user } = context.switchToHttp().getRequest();
    const user: User = {
      name: 'Arezoo',
      roles: [Role.USER],
    };

    return requireRoles.some((role) => user.roles.includes(role));
  }
}
