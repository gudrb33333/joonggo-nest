import { Module ,NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { ModelsModule } from './main/resources/models/models.module'

import { LoginModule } from './main/modelcontroller/login/login.module';
import { LoginService } from './main/modelcontroller/login/login.service';
import { LoginController } from './main/modelcontroller/login/login.controller';

import { PostModule } from './main/modelcontroller/posts/module/posts.module';
import { PostService } from './main/modelcontroller/posts/service/posts.service';
import { PostController } from './main/modelcontroller/posts/controller/posts.controller';

import { AuthService } from './main/modelcontroller/auth/auth.service';
import { AuthModule } from './main/modelcontroller/auth/auth.module';
import { IsLoggedIn,IsNotLoggedIn } from './middleware/auth.middleware';

import { UsersService } from './main/modelcontroller/users/users.service';
import { UsersModule } from './main/modelcontroller/users/users.module';
import { AuthController } from './main/modelcontroller/auth/auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from "@nestjs/config";
import * as ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({isGlobal: true}),
    ModelsModule,
    LoginModule,
    PostModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [ PostController, LoginController],
  providers: [ PostService, LoginService, UsersService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(IsLoggedIn,IsNotLoggedIn)
          .forRoutes('cats');
    }
}
