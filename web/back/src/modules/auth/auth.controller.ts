import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from '~/common/decorators/common.decorator';
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 经过jwt管理的登录接口
  @Public()
  @Post('session')
  async login(
    @Body() credentials: { email: string; password: string },
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.validate(credentials, res);
  }
}
