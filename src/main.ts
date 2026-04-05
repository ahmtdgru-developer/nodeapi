import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Node API Örneği')              // API Başlığı
    .setDescription('API dokümantasyonu açıklaması')   // Açıklama
    .setVersion('1.0')
    .addTag('users')
    .addTag('comments')
    .addBearerAuth() // <-- Token ile test imkanı!
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger hangi adreste çalışsın? biz 'api' dedik


  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.flatMap((error) => {
          const constraints = error.constraints ?? {};

          return Object.entries(constraints).map(([key, value]) => {
            if (key === 'whitelistValidation') {
              return `${error.property} alanına izin verilmiyor`;
            }

            return value;
          });
        });

        return new BadRequestException({
          message: messages,
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    }),
  );
  await app.listen(port);
}
bootstrap();
