
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
    UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm";
    
import { User } from './user.entity'

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column({nullable:true})
  price: number;

  @Column({nullable:true})
  img:string;

  @Column({nullable:true})
  repImg:string;

  @Column()
  content:string;

  @CreateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({nullable:true})
  updatedAt: Date;

  @Column({nullable:true})
  deletedAt: Date;

  @ManyToOne(() => User, user => user.post)
  user: User; 

}