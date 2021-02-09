import { Controller, Get, Req, Query, Post, Body, Put, Param, Delete, Res, UseGuards, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JwtAuthGuard } from 'src/main/modelcontroller/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard'
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedExceptionFilter } from '../../../filters/auth.exception.filter'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getPosts(@Req() req:Request, @Res() res:Response) {

        console.log('testest')
        if(!req.isAuthenticated()){
            return res.json('error');
        }else{
            return res.json(req.user);
        }

    }


    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @UseFilters(new UnauthorizedExceptionFilter())
    async login(@Body() login: AuthDto, @Req() req: Request, @Res() res: Response){    

        return res.json(await this.authService.login(req.user));
      
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
    getJoinPage(@Req() req:Request, @Res() res:Response): void{

        res.render('join',{ title: '회원가입 - NodeBird'})
    }

    @Post('/join')
    postJoin(@Body() authDto:AuthDto , @Res() res:Response): void{

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
            })
    }

}
