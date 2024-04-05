import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true //추가로 들어오는 속성을 제외(보안상 이유)
    })
  )
  await app.listen(3000);
}
bootstrap();
