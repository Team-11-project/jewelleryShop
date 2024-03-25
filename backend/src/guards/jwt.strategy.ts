import { Injectable } from '@nestjs/common';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
      // || 'defaultSecretKey', // Provide a default value
    });
  }

  async validate(payload: any) {
    // if (!payload.user) {
    //   throw new UnauthorizedException('Invalid payload');
    // }
    return { ...payload.user };
  }
}
