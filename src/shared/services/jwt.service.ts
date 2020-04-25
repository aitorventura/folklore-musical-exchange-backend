import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwt: any,
    private readonly secret: string
  )  {
  }

  encode(data: object): string {
    return this.jwt.sign(data, this.secret)
  }

  decode(token: string): any {
    return this.jwt.verify(token, this.secret)
  }
}