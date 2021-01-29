import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from "@nestjs/config";
import { Repository } from 'typeorm';
import { User } from '../../../resources/models/user.entity';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

  constructor( 
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string, done: any): Promise<any> {
    try{  

        const exUser:User = await this.usersRepository.findOne(email);

        if(exUser){
            const result = await bcrypt.compare(pass, exUser.password);
            if(result){
                done(null, exUser);
            }else{
                done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
        }else{
            done(null, false, { message: '가입되지 않은 회원입니다.' });
        }
    }catch(error){
        console.error(error);
    }
  }

  async kakaoValidateUser(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>{
    try {


      const exUser:User = await this.usersRepository.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await this.usersRepository.save({
          email: profile._json && profile._json.kakao_account_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        console.log(newUser);
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
}

  async createUser(authDto:AuthDto):Promise<string>{
    try{

        const exUser:User = await this.usersRepository.findOne(authDto.email);
        if(exUser){
            return 'exUser';
        }

        const hash = await bcrypt.hash(authDto.password, 12);
        authDto.password = hash;

        await this.usersRepository.save(authDto);

        return 'success';
    }catch(error){
        return error;
    }

  }

  
}