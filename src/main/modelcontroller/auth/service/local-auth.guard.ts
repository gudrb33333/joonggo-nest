
import { Injectable, ExecutionContext, UnauthorizedException,Res,Req,Catch, Logger, ExceptionFilter,ArgumentsHost } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const result = (await super.canActivate(context) as boolean); // THIS MUST BE CALLED FIRST
        await super.logIn(request);
        return result;
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }


    
}