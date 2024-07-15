/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');


  app.setGlobalPrefix('api')

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.use((req: any, res: any, next: any) => {
    const now = Date.now();
    res.on('finish', () => {
      const elapsed = Date.now() - now;
      logger.log(
        `Request ${req.method} ${req.url} ${res.statusCode} ${elapsed}ms`,
      );
    });
    next();
  });

  await app.listen(process.env.PORT || 5005);
}

bootstrap();
