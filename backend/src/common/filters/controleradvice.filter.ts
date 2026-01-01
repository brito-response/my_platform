import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '../errors/api.error';

@Catch()
export class ControllerAdviceFilter implements ExceptionFilter {
  private readonly logger = new Logger(ControllerAdviceFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof ApiError) {
      status = exception.status;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    this.logger.error(`Erro em ${request.method} ${request.url}`, JSON.stringify({ status, message, stack: (exception as any).stack }));

    response.status(status).json({statusCode: status,timestamp: new Date().toISOString(),path: request.url,message});
  }
}
