import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentation de l’API de votre application')
    .setVersion('1.0')
    .addTag('health-check')
    .build();
    app.enableCors({
      origin: 'http://localhost:5173',
      credentials: true, // optional if you need to allow cookies or authorization headers
    });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(7410);
}
bootstrap();
