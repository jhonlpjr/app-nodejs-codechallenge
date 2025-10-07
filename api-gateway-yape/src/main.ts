import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 8000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (errors) => {
        const messages = errors.map(error => {
          const constraints = error.constraints;
          return Object.values(constraints || {}).join(', ');
        });
        return new Error(`Validation failed: ${messages.join('; ')}`);
      },
    }),
  );

  //* Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  console.log(`🚀 GraphQL API Gateway running on port ${port}`);
  console.log(`🔍 GraphQL Playground available at: http://localhost:${port}/graphql`);

  await app.listen(port);
}

bootstrap();
