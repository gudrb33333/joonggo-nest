
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, PrimaryColumn, DeleteDateColumn, OneToOne, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm";


  @Entity('fileManageDetail')
  export class FileManageDetail {
    @PrimaryGeneratedColumn()
    atchFileId: number;

    @PrimaryColumn()
    FileSn: number;

    @Column()
    FileStreCours: string;

    @Column()
    StreFileNm: string;

    @Column()
    OrignlFileNm: string;

    @Column()
    FileExtsn: string;

    @Column({nullable:true})
    FileCn: string;

    @Column()
    FileSize: string;

    @CreateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
  
    @Column({nullable:true})
    updatedAt: Date;
  
    @Column({nullable:true})
    deletedAt: Date;
  
   
  }