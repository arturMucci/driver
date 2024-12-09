import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomHttpExceptionFilter());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('DriverApi')
    .setDescription(
      'Uma Api conceito onde o usuário poderá solicitar uma viagem em carro particular.',
    )
    .setVersion('1.0')
    .addTag('PS_Shopper_Api')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}
bootstrap();
