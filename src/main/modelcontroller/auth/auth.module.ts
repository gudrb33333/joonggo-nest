import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { ModelsModule } from 'src/main/resources/models/models.module'
import { AuthController } from './auth.controller';

import { IsLoggedIn,IsNotLoggedIn } from 'src/middleware/auth.middleware';
@Module({
  imports: [
    UsersModule,
    PassportModule.register({session: true}), 
    ModelsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    })
  
  ],
  providers: [AuthService, LocalStrategy, KakaoStrategy, JwtStrategy],
  controllers : [AuthController],
  exports: [PassportModule]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer){
      consumer
        .apply(IsNotLoggedIn)
        .forRoutes('/auth/login','/auth/join')
        .apply(IsLoggedIn)
        .forRoutes('/auth/logout')
    }
}
