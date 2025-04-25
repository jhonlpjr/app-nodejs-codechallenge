import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 8000;
  const apiPrefix = process.env.API_PREFIX || 'api';
  //* Global Prefix
  app.setGlobalPrefix(`${apiPrefix}/v1`);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Habilita la transformación de tipos
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no definidas en el DTO
    }),
  );

  //* Enable CORS
  app.enableCors();

  //SWAGGER
  const config = new DocumentBuilder()
    .setTitle('YAPE - API')
    .setDescription('Rest API para YAPE')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Extension /api
  SwaggerModule.setup(`${apiPrefix}/swagger`, app, document);

  await app.listen(port);
}

bootstrap();
