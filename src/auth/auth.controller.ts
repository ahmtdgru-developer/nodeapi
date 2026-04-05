import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Login herkes için açık olmalı
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Kullanıcı girişi yapar ve JWT token döner' })
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
