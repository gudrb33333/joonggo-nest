import {UnauthorizedException,ExceptionFilter,ArgumentsHost } from '@nestjs/common';

export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.redirect(`/?loginError=${response.req.authInfo.message}`);
    }
}