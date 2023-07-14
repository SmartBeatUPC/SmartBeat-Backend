import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    if (status === HttpStatus.BAD_REQUEST) {
      response.status(status).json({
        statusCode: status,
        message: 'Bad Request',
        error: errorResponse,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: 'Internal Server Error',
        error: 'Internal Server Error',
      });
    }
  }
}
