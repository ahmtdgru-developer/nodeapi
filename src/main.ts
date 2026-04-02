import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
