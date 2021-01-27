import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as nunjucks from 'nunjucks';
import * as passport from 'passport';

import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();

  const assets = path.join(__dirname, '../src', 'public'); // Directory with static HTML/CSS/JS/other files
  const views = path.join(__dirname, '../src', 'views'); // Directory with *.njk templates

  nunjucks.configure(views, { express });
  
  app.useStaticAssets(assets);
  app.setBaseViewsDir(views);
  app.setViewEngine('html');
  await app.listen(3000);
}
bootstrap();
