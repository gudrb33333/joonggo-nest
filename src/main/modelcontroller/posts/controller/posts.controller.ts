import { Controller, Get, Req, Query, Post, Body, Put, Param, Delete, Res, UseGuards,UseFilters } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JwtAuthGuard } from 'src/main/modelcontroller/auth/guard/jwt-auth.guard';
import { PostService } from '../service/posts.service';
import { PostDto } from '../dto/post.dto'

import { UnauthorizedExceptionFilter } from '../../../../filters/auth.exception.filter'

@Controller('/post')
export class PostController {

    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @UseFilters(new UnauthorizedExceptionFilter())
    @Get('/')
    getPosts(@Req() req:Request, @Res() res:Response) {

        if(!req.isAuthenticated()){
            return res.json('error');
        }else{
            return res.json(req.user);
        }

    }

    @Get('/addPost')
    getAddPostView(@Req() req:Request, @Res() res:Response){
        res.render('addPost',{ title: '글쓰기 - joonggo'})
    }
    
    @Post('/addPost')
    postAddPost(@Body() postDto:PostDto,@Req() req:Request, @Res() res:Response): void{

        console.log('1111');
        console.log(postDto);

        this.postService.addPost(postDto)
            .then(()=>{
                
            })
            .catch(()=>{
                
            })

        res.redirect('/');
    }

}
