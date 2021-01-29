import { Controller, Get, Req, Query, Post, Body, Put, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PostService } from './posts.service';

@Controller('/')
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Get('/')
    getPosts(@Req() req:Request, @Res() res:Response, next:NextFunction): void {
        
        
        if(!req.isAuthenticated()){
            res.render('login', {title: 'NodeBird'});
        }else{
            res.render('main', {title: 'NodeBird'});
        }

    }


}
