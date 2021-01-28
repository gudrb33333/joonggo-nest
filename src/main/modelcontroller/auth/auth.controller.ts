import { Controller, Get, Req, Query, Post, Body, Put, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {

    @Get('/join')
    getJoinPage(@Req() req:Request, @Res() res:Response, next:NextFunction): void{

        res.render('join',{ title: '회원가입 - NodeBird'})
    }

    @Post('/join')
    postJoin(@Body() authDto:AuthDto , @Res() res:Response, next:NextFunction): void{

        let dto:AuthDto = authDto

        console.log(dto);

    }
}
