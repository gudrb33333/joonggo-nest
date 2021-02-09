import {UnauthorizedException,ExceptionFilter,ArgumentsHost, Catch } from '@nestjs/common';
import { request } from 'http';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response
            .status(status)
            .json(exception.getResponse());
    }
}