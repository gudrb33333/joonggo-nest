import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../service/local.strategy';
import { KakaoStrategy } from '../service/kakao.strategy';
import { ModelsModule } from 'src/main/resources/models/models.module'
import { CookieSerializer } from '../service/cookie.serializer';
import { AuthController } from '../controller/auth.controller';

import { IsLoggedIn,IsNotLoggedIn } from 'src/middleware/auth.middleware';
@Module({
  imports: [UsersModule, PassportModule.register({session: true}), ModelsModule ],
  providers: [AuthService, LocalStrategy, KakaoStrategy, CookieSerializer ],
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
