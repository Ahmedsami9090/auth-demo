import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    transform : true,
    whitelist : true,
    forbidNonWhitelisted : true
  }))
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port!);
  console.log(`server is running successfully on port ${port}`);
}
bootstrap();
