import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = new ConfigService();
  const logger = new Logger();
  const port = configService.get<number>('HTTP_SERVER_PORT') || 3000;
  const project = 'sempertex-back';
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Prueba tecnica')
    .setDescription(
      'Prueba tecnica para la vacante de fullstack developer en Sempertex',
    )
    .addBasicAuth()
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`/api/v1/${project}/docs`, app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(port);

  logger.debug(`🧨 => [APP] ${project} is running on http://localhost:${port}`);
  logger.debug(
    `🥟 => [SWAGGER] is running on http://localhost:${port}/api/v1/${project}/docs`,
  );
}
bootstrap();
