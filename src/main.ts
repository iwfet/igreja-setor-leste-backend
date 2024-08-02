import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCsrf from '@fastify/csrf-protection';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const logger = new Logger('App');

  app.setGlobalPrefix('api');

  // app.enableCors({
  //   origin: ['http://localhost:8080/'],
  //   methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  //   credentials: true,
  // });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.register(fastifyCsrf);

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
