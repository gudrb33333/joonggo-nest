import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IsLoggedIn implements NestMiddleware{
    use(req:Request, res:Response, next:NextFunction){
        if (req.isAuthenticated()) {
            next();
          } else {
            const message = encodeURIComponent('로그인이 필요합니다.');
            res.redirect(`/?loginError=${message}`);
          }
    }
}

@Injectable()
export class IsNotLoggedIn implements NestMiddleware{
    use(req:Request, res:Response, next:NextFunction){
        if (!req.isAuthenticated()) {
            next();
          } else {
            const message = encodeURIComponent('로그인한 상태입니다.');
            res.redirect(`/?error=${message}`);
          }
    }
}