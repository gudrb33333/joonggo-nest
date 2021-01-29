import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ clientID: process.env.KAKAO_ID,
            clientSecret: process.env.COOKIE_SECRET,
            callbackURL: '/auth/kakao/callback',});
    }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    await this.authService.kakaoValidateUser(accessToken, refreshToken, profile, done);
          
  }
}