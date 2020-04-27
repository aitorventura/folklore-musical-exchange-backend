import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '../shared/services/jwt.service';
import { plainToClass } from 'class-transformer';
import { RequesterDto } from '../shared/dtos/requester.dto';
import { RequesterRole } from '../shared/enums/requester-role.enum';
import { Requester } from '../shared/entities/requester';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers['token']) {

      return false;
    }
    try {
      const requester = plainToClass(RequesterDto, this.jwtService.decode(request.headers['token']));

      request.requester = plainToClass(Requester, requester);
      return true;
    } catch (e) {
      return false;
    }
  }
}
