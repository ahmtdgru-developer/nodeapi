import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    // Hata mesajını çekelim (Validator'dan geliyorsa dizi olabilir, normalde string'dir)
    const message = 
      typeof exceptionResponse === 'object' 
        ? exceptionResponse.message 
        : exception.message;

    response.status(status).json({
      success: false,
      data: null,
      message: Array.isArray(message) ? message.join(', ') : message,
    });
  }
}
