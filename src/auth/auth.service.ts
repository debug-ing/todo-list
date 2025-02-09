import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  signToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
