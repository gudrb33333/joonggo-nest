import { Module ,NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { ModelsModule } from './main/resources/models/models.module'

import { LoginModule } from './main/modelcontroller/login/login.module';
import { LoginService } from './main/modelcontroller/login/login.service';
import { LoginController } from './main/modelcontroller/login/login.controller';

import { PostModule } from './main/modelcontroller/post/post.module';
import { PostService } from './main/modelcontroller/post/post.service';
import { PostController } from './main/modelcontroller/post/post.controller';

import { AuthService } from './main/modelcontroller/auth/auth.service';
import { AuthModule } from './main/modelcontroller/auth/auth.module';
import { IsLoggedIn,IsNotLoggedIn } from './main/modelcontroller/auth/auth.middleware';

import { UsersService } from './main/modelcontroller/users/users.service';
import { UsersModule } from './main/modelcontroller/users/users.module';
import { AuthController } from './main/modelcontroller/auth/auth.controller';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ModelsModule,
    LoginModule,
    PostModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [ PostController, LoginController, AuthController],
  providers: [ PostService, LoginService, AuthService, UsersService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(IsLoggedIn,IsNotLoggedIn)
          .forRoutes('cats');
    }
}
