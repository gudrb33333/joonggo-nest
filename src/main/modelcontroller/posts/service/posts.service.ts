import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../resources/models/post.entity';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private readonly postsReposity: Repository<Post>){}

  async findPosts():Promise<Post[]>{
    return  await this.postsReposity.find({
      relations:['user'],
      order: {
        updatedAt: "DESC"
      },
      skip: 0,
      take: 10
  });


  }

  async addPost(postDto:PostDto):Promise<string>{
    postDto.UpdateAt = new Date();
    
    await this.postsReposity.save(postDto);

    return 
  }

}
