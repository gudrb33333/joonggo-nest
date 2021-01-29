import { Controller, Get, Req, Query, Post, Body, Put, Param, Delete, Res, UseGuards, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LocalAuthGuard } from '../service/local-auth.guard'
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
    login(@Body() login: AuthDto, @Req() req, @Res() res): Promise<any> {    
        return  res.redirect('/');  
    }


    @Get('/join')
    getJoinPage(@Req() req:Request, @Res() res:Response, next:NextFunction): void{

        res.render('join',{ title: '회원가입 - NodeBird'})
    }

    @Post('/join')
    postJoin(@Body() authDto:AuthDto , @Res() res:Response, next:NextFunction): void{

        this.authService.makeUser(authDto)
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
