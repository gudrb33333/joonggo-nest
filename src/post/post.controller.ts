import { Controller, Get, Req, Query, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PostService } from './post.service';

@Controller('/')
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Get('/')
    getPosts(@Req()req:Request,@Res() res:Response, next:NextFunction): void {
        
        
            return res.render('login', {title: 'NodeBird'});

    }

}
