
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, DeleteDateColumn, Timestamp, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
  
  import { Post } from './post.entity'
  import { FileManage } from './fileManage.entity'
  
  @Entity('user')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column({nullable:true})
    nick: string;
  
    @Column()
    password: string;
  
    @Column()
    provider: string;
  
    @Column({nullable:true})
    snsId: string;
  
    @CreateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
  
    @Column({nullable:true})
    updatedAt: Date;
  
    @Column({nullable:true})
    deletedAt: Date;
  
    @OneToMany( () => Post, post => post.user)
    post: Post[];

    @OneToMany(type => FileManage, fileManage => fileManage.user)
    fileManage: FileManage[];
   
  }