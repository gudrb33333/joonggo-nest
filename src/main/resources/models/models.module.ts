import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { FileManage } from './fileManage.entity';
import { FileManageDetail } from './fileManageDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Post,FileManage,FileManageDetail])],
  exports: [TypeOrmModule],
})
export class ModelsModule {}