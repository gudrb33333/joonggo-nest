
import { Injectable, ExecutionContext, UnauthorizedException,Res,Req,Catch, Logger, ExceptionFilter,ArgumentsHost } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}