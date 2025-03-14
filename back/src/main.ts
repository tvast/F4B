// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  server.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,POST',
  });
  
  // Assuming you have something like this for Socket.IO:


  const config = new DocumentBuilder()
    .setTitle('Automation API')
    .setDescription('API documentation for automation endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(server, config);
  SwaggerModule.setup('api', server, document);

  await server.listen(7410);
}
bootstrap();
