import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置请求体的大小限制
  app.use(bodyParser.json({ limit: '5mb' }));
  app.enableCors({
    origin: 'http://localhost:3072', // 前端域名
    credentials: true, // 允许前端请求携带凭证
  });
  // 设置服务器静态文件服务
  app.use('/public', express.static(path.join(__dirname, 'public')));
  //使用全局请求解析request cookie
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
