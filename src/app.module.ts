import { Module } from '@nestjs/common';
import { ModelsModule } from './models/models.module'

import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';

import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';

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
  ],
  controllers: [ PostController, LoginController],
  providers: [ PostService, LoginService],
})
export class AppModule {}
