import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../resources/models/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CookieSerializer extends PassportSerializer {

    constructor( @InjectRepository(User) private readonly usersRepository: Repository<User>) {super()}

    serializeUser(user: any, done: (err: any, id?: any) => void): void {
        done(null, user.id);
    }

    deserializeUser(id: any, done: (err: any, id?: any) => void): void {
        this.usersRepository.findOne(id)
            .then((user)=>{
                done(null, user);
            }).catch((error)=>{
                done(error);
            })
    }
}