
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm";

import { User } from './user.entity' 
  
  @Entity('fileManage')
  export class FileManage {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: "1" })
    useAt: string;

    @CreateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
  
    @Column({nullable:true})
    updatedAt: Date;
  
    @Column({nullable:true})
    deletedAt: Date;
  
    @ManyToOne(() => User, user => user.fileManage)
    user: User;
   
  }