import { Controller, Get, Req, Query, Post, Body, Put, Param, Delete, Res, UseGuards, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LocalAuthGuard } from '../service/local-auth.guard'
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedExceptionFilter } from '../service/auth.exception.filter'

import { AuthService } from '../service/auth.service'
import { AuthDto } from '../dto/auth.dto';

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @UseFilters(new UnauthorizedExceptionFilter())
    login(@Body() login: AuthDto, @Req() req: Request, @Res() res: Response): void {    
        return  res.redirect('/');  
    }

    @Get('/kakao')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('kakao'))
    kakaoLogin(@Req() req: Request, @Res() res: Response): void{
        return  res.redirect('/');  
    }

    @Get('/kakao/callback')
    @UseGuards(AuthGuard('kakao'))
    kakaoCallback(@Req() req: Request, @Res() res: Response): void{
        return  res.redirect('/');  
    }

    @Get('/logout')
    logout( @Req() req: Request, @Res() res: Response){
        req.logOut();
        req.session.destroy((err:Error)=>{
            console.log(err);
        });
        return  res.redirect('/');  
    }

    @Get('/join')
    getJoinPage(@Req() req:Request, @Res() res:Response, next:NextFunction): void{

        res.render('join',{ title: '회원가입 - NodeBird'})
    }

    @Post('/join')
    postJoin(@Body() authDto:AuthDto , @Res() res:Response, next:NextFunction): void{

        this.authService.createUser(authDto)
            .then((result)=>{
                switch(result){
                    case 'exUser' : res.redirect('/auth/join?error=exist');
                    break;

                    case 'success' : res.redirect('/');
                    break;
                }
            })
            .catch((error)=>{
                console.error(error);
                next(error);
            })
    }

}
