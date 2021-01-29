import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../service/local.strategy';
import { ModelsModule } from 'src/main/resources/models/models.module'
import { CookieSerializer } from '../service/cookie.serializer';
import { AuthController } from '../controller/auth.controller';

@Module({
  imports: [UsersModule, PassportModule.register({session: true}), ModelsModule ],
  providers: [AuthService, LocalStrategy, CookieSerializer ],
  controllers : [AuthController],
  exports: [PassportModule]
})
export class AuthModule {}
